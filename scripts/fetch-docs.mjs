#!/usr/bin/env node
/**
 * Fetch Kaggle documentation from:
 *  1) https://www.kaggle.com/llms.txt  (index)
 *  2) https://www.kaggle.com/docs/*.md  (platform docs — markdown endpoint)
 *  3) GitHub Kaggle/kaggle-cli         (CLI + skills reference)
 *  4) GitHub Kaggle/kagglehub          (Python library)
 *
 * Writes:
 *   docs/llms.txt
 *   docs/list.json
 *   docs/pages/  (mirrored markdown tree)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DOCS = path.join(ROOT, "docs");
const PAGES = path.join(DOCS, "pages");
const CONCURRENCY = Math.max(1, Number(process.env.FETCH_CONCURRENCY || 6));
const TIMEOUT_MS = Math.max(5000, Number(process.env.FETCH_TIMEOUT_MS || 30000));
const UA =
  process.env.FETCH_UA ||
  "kaggle-docs-mirror/1.0 (+https://github.com/xiaoqianran/kaggle-docs)";

const LLMS_URL = "https://www.kaggle.com/llms.txt";

/** Official platform docs that publish Markdown via .md suffix */
const PLATFORM_DOCS = [
  "api",
  "benchmarks",
  "competitions",
  "datasets",
  "efficient-gpu-usage",
  "models",
  "notebooks",
  "organizations",
  "packages",
  "tpu",
];

const GH_CLI = {
  owner: "Kaggle",
  repo: "kaggle-cli",
  branch: "main",
  paths: [
    "README.md",
    "CHANGELOG.md",
    "docs/README.md",
    "docs/benchmarks.md",
    "docs/competition_creation.md",
    "docs/competitions.md",
    "docs/configuration.md",
    "docs/datasets.md",
    "docs/datasets_metadata.md",
    "docs/forums.md",
    "docs/kernels.md",
    "docs/kernels_metadata.md",
    "docs/model_variations.md",
    "docs/model_variations_versions.md",
    "docs/models.md",
    "docs/models_metadata.md",
    "docs/output_format.md",
    "docs/search.md",
    "docs/simulation_competitions.md",
    "docs/tutorials.md",
    "skills/SKILL.md",
    "skills/references/auth.md",
    "skills/references/benchmarks.md",
    "skills/references/competitions.md",
    "skills/references/configuration.md",
    "skills/references/datasets.md",
    "skills/references/files.md",
    "skills/references/forums.md",
    "skills/references/kernels.md",
    "skills/references/model_variations.md",
    "skills/references/model_variations_versions.md",
    "skills/references/models.md",
    "skills/references/quota.md",
    "skills/references/search.md",
  ],
};

const GH_HUB = {
  owner: "Kaggle",
  repo: "kagglehub",
  branch: "main",
  paths: ["README.md", "CHANGELOG.md", "CONTRIBUTING.md"],
};

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function sanitize(text) {
  let t = String(text);
  t = t.replace(/\bghp_[A-Za-z0-9]{20,}\b/g, "ghp_REDACTED");
  t = t.replace(/\bgithub_pat_[A-Za-z0-9_]{20,}\b/g, "github_pat_REDACTED");
  t = t.replace(/\bAKIA[0-9A-Z]{16}\b/g, "AKIA_REDACTED");
  t = t.replace(/\bkaggle[-_]?key[=:]\s*\S+/gi, "kaggle-key=REDACTED");
  return t;
}

function isHtml(text) {
  const t = String(text).trimStart().slice(0, 200).toLowerCase();
  return t.startsWith("<!doctype") || t.startsWith("<html") || t.startsWith("<head");
}

async function fetchText(url, { accept } = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        "User-Agent": UA,
        Accept: accept || "text/markdown, text/plain;q=0.9, */*;q=0.1",
      },
      redirect: "follow",
    });
    if (!res.ok) {
      const err = new Error(`HTTP ${res.status} for ${url}`);
      err.status = res.status;
      throw err;
    }
    const buf = await res.arrayBuffer();
    const text = new TextDecoder("utf-8").decode(buf);
    return { text, finalUrl: res.url, contentType: res.headers.get("content-type") || "" };
  } finally {
    clearTimeout(timer);
  }
}

function writePage(rel, text, meta) {
  const out = path.join(PAGES, rel);
  ensureDir(path.dirname(out));
  fs.writeFileSync(out, sanitize(text));
  return { rel, bytes: Buffer.byteLength(text), ...meta };
}

async function mapPool(items, limit, fn) {
  const results = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return results;
}

async function fetchPlatformDoc(slug) {
  const url = `https://www.kaggle.com/docs/${slug}.md`;
  try {
    const { text, finalUrl, contentType } = await fetchText(url);
    if (isHtml(text) || text.trim().length < 40) {
      return { ok: false, slug, url, error: "html-or-empty" };
    }
    const rel = `platform/${slug}.md`;
    const row = writePage(rel, text, {
      source: "kaggle.com",
      url,
      finalUrl,
      contentType,
      track: "Platform Docs",
    });
    console.log(`ok  platform  ${slug}  ${row.bytes}b`);
    return { ok: true, ...row };
  } catch (e) {
    console.warn(`fail platform  ${slug}: ${e.message}`);
    return { ok: false, slug, url, error: e.message };
  }
}

async function fetchGithubFile(repoCfg, filePath) {
  const raw = `https://raw.githubusercontent.com/${repoCfg.owner}/${repoCfg.repo}/${repoCfg.branch}/${filePath}`;
  const label = `${repoCfg.repo}/${filePath}`;
  try {
    const { text, finalUrl } = await fetchText(raw, {
      accept: "text/plain, text/markdown;q=0.9, */*;q=0.1",
    });
    if (isHtml(text) || text.trim().length < 20) {
      return { ok: false, path: filePath, error: "html-or-empty" };
    }
    let rel;
    let track;
    if (repoCfg.repo === "kagglehub") {
      rel = `kagglehub/${filePath === "README.md" ? "intro.md" : filePath}`;
      track = "KaggleHub";
    } else if (filePath.startsWith("skills/")) {
      rel = filePath;
      track = "Agent Skills";
    } else if (filePath.startsWith("docs/")) {
      rel = `cli/${filePath.slice("docs/".length)}`;
      track = "CLI & API";
    } else if (filePath === "README.md") {
      rel = `cli/intro.md`;
      track = "CLI & API";
    } else if (filePath === "CHANGELOG.md") {
      rel = `cli/changelog.md`;
      track = "CLI & API";
    } else {
      rel = `cli/${filePath}`;
      track = "CLI & API";
    }
    const row = writePage(rel, text, {
      source: `github:${repoCfg.owner}/${repoCfg.repo}`,
      url: raw,
      finalUrl,
      track,
      githubPath: filePath,
    });
    console.log(`ok  github    ${label}  ${row.bytes}b`);
    return { ok: true, ...row };
  } catch (e) {
    console.warn(`fail github    ${label}: ${e.message}`);
    return { ok: false, path: filePath, error: e.message };
  }
}

function stubGettingStarted() {
  const text = `# Getting Started on Kaggle

Official llms.txt links to [Getting Started](https://www.kaggle.com/docs/getting-started), but that page is **not published as Markdown**.

Use these platform docs instead:

- [Competitions](competitions.md)
- [Datasets](datasets.md)
- [Notebooks](notebooks.md)
- [Models](models.md)
- [Public API](api.md)
- [Kaggle CLI](../cli/intro.md)
- [KaggleHub](../kagglehub/intro.md)

Or open the [official getting started page](https://www.kaggle.com/docs/getting-started).
`;
  return writePage("platform/getting-started.md", text, {
    source: "stub",
    url: "https://www.kaggle.com/docs/getting-started",
    track: "Platform Docs",
  });
}

function writeIndex() {
  const text = `# Kaggle documentation mirror

This site mirrors **official Kaggle docs** for offline / AI-friendly reading.

## Sources

| Track | Source |
|-------|--------|
| Platform Docs | [kaggle.com/docs](https://www.kaggle.com/docs) + [llms.txt](https://www.kaggle.com/llms.txt) |
| CLI & API | [Kaggle/kaggle-cli](https://github.com/Kaggle/kaggle-cli) docs folder |
| Agent Skills | [Kaggle/kaggle-cli](https://github.com/Kaggle/kaggle-cli) skills folder |
| KaggleHub | [Kaggle/kagglehub](https://github.com/Kaggle/kagglehub) |

## Start here

1. [Platform: Competitions](platform/competitions.md)
2. [Platform: Datasets](platform/datasets.md)
3. [Platform: Notebooks](platform/notebooks.md)
4. [Platform: Models](platform/models.md)
5. [Public API overview](platform/api.md)
6. [CLI introduction](cli/intro.md)
7. [CLI tutorials](cli/tutorials.md)
8. [KaggleHub](kagglehub/intro.md)

Official site: [https://www.kaggle.com](https://www.kaggle.com)
`;
  return writePage("index.md", text, { source: "mirror", track: "Home", url: "" });
}

async function main() {
  ensureDir(PAGES);
  fs.rmSync(PAGES, { recursive: true, force: true });
  ensureDir(PAGES);

  console.log("Fetching llms.txt…");
  const { text: llms } = await fetchText(LLMS_URL, { accept: "text/plain, */*" });
  fs.writeFileSync(path.join(DOCS, "llms.txt"), llms);
  console.log(`llms.txt ${llms.length} bytes`);

  const results = [];

  results.push(writeIndex());
  results.push(stubGettingStarted());

  console.log(`\nPlatform docs (${PLATFORM_DOCS.length})…`);
  results.push(...(await mapPool(PLATFORM_DOCS, CONCURRENCY, fetchPlatformDoc)));

  console.log(`\nkaggle-cli (${GH_CLI.paths.length})…`);
  results.push(
    ...(await mapPool(GH_CLI.paths, CONCURRENCY, (p) => fetchGithubFile(GH_CLI, p))),
  );

  console.log(`\nkagglehub (${GH_HUB.paths.length})…`);
  results.push(
    ...(await mapPool(GH_HUB.paths, CONCURRENCY, (p) => fetchGithubFile(GH_HUB, p))),
  );

  const ok = results.filter((r) => r && r.ok !== false && r.rel);
  const fail = results.filter((r) => r && r.ok === false);

  const list = {
    fetchedAt: new Date().toISOString(),
    sources: {
      llms: LLMS_URL,
      platform: "https://www.kaggle.com/docs",
      cli: "https://github.com/Kaggle/kaggle-cli",
      kagglehub: "https://github.com/Kaggle/kagglehub",
    },
    ok: ok.length,
    failed: fail.length,
    pages: ok.map((r) => ({
      rel: r.rel,
      bytes: r.bytes,
      source: r.source,
      url: r.url,
      track: r.track,
    })),
    failures: fail.map((r) => ({
      slug: r.slug || r.path,
      url: r.url,
      error: r.error,
    })),
  };

  fs.writeFileSync(path.join(DOCS, "list.json"), JSON.stringify(list, null, 2));
  fs.writeFileSync(
    path.join(DOCS, "llms-urls.txt"),
    [
      LLMS_URL,
      ...PLATFORM_DOCS.map((s) => `https://www.kaggle.com/docs/${s}.md`),
      ...GH_CLI.paths.map(
        (p) =>
          `https://raw.githubusercontent.com/${GH_CLI.owner}/${GH_CLI.repo}/${GH_CLI.branch}/${p}`,
      ),
      ...GH_HUB.paths.map(
        (p) =>
          `https://raw.githubusercontent.com/${GH_HUB.owner}/${GH_HUB.repo}/${GH_HUB.branch}/${p}`,
      ),
    ].join("\n") + "\n",
  );

  console.log(`\nDone ok=${ok.length} failed=${fail.length}`);
  if (fail.length) {
    for (const f of fail) console.warn("  -", f.slug || f.path, f.error);
  }
  if (ok.length < 20) {
    console.error("Too few pages; aborting");
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
