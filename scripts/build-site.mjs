#!/usr/bin/env node
// Kaggle docs — modal-docs page form (EN + zh-CN)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";
import { normalizeMdxMarkdown } from "./mdx-normalize.mjs";
import { createParadigm } from "./paradigm-page.mjs";
import { writeLlmsArtifacts } from "./generate-llms.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const EN_PAGES = path.join(ROOT, "docs", "pages");
const ZH_PAGES = path.join(ROOT, "docs", "zh", "pages");
const DIST = path.join(ROOT, "dist");
const BASE = (process.env.PAGES_BASE || "").replace(/\/$/, "");
const UI = JSON.parse(fs.readFileSync(path.join(__dirname, "i18n", "ui.json"), "utf8"));

const CHEV_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>';

const TRACK_META = [
  { id: "home", name: "Home", dir: null, badge: "·" },
  { id: "platform", name: "Platform Docs", dir: "platform", badge: "①" },
  { id: "cli", name: "CLI & API", dir: "cli", badge: "②" },
  { id: "skills", name: "Agent Skills", dir: "skills", badge: "③" },
  { id: "kagglehub", name: "KaggleHub", dir: "kagglehub", badge: "④" },
];

const OFFICIAL = "https://www.kaggle.com/docs";
const PREFERRED = ["platform", "cli"];

function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }
function asset(p, locale = "en") {
  const rel = String(p).replace(/^\//, "");
  const isShared = rel.startsWith("assets/") || rel.startsWith("meta/");
  const locPrefix = !isShared && locale === "zh" ? "zh/" : "";
  const full = locPrefix + rel;
  return BASE ? `${BASE}/${full}` : `/${full}`;
}
function htmlEscape(s) {
  return String(s).replace(/&/g, "&"+"amp;").replace(/</g, "&"+"lt;").replace(/>/g, "&"+"gt;").replace(/"/g, "&"+"quot;");
}
function isHtmlDoc(text) {
  const t = String(text).trimStart().slice(0, 200).toLowerCase();
  return t.startsWith("<!doctype") || t.startsWith("<html") || t.startsWith("<head");
}
function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else if (ent.isFile() && ent.name.endsWith(".md")) acc.push(p);
  }
  return acc;
}
function titleFromMd(md, fallback) {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? m[1].replace(/[`*]/g, "").trim() : fallback;
}
function humanize(slug) {
  return slug.replace(/\.md$/, "").replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
function relToHtml(rel) { return rel.replace(/\.md$/, ".html"); }

const P = createParadigm({ htmlEscape, asset, CHEV_SVG, relToHtml });

function buildNav(files, locale) {
  const byTrack = new Map(TRACK_META.map((t) => [t.id, { ...t, groups: [] }]));

  for (const f of files) {
    let trackId = "home";
    if (f.rel.startsWith("platform/")) trackId = "platform";
    else if (f.rel.startsWith("cli/")) trackId = "cli";
    else if (f.rel.startsWith("skills/")) trackId = "skills";
    else if (f.rel.startsWith("kagglehub/")) trackId = "kagglehub";
    else if (f.rel === "index.md") trackId = "home";

    const track = byTrack.get(trackId);
    if (!track) continue;

    let groupName = "Pages";
    if (trackId === "skills") {
      groupName = f.rel.includes("/references/") ? "References" : "Overview";
    } else if (trackId === "cli") {
      if (f.rel.includes("metadata")) groupName = "Metadata schemas";
      else if (/changelog|intro|configuration|output|search|tutorials|README/i.test(f.rel))
        groupName = "Getting started";
      else groupName = "Commands";
    } else if (trackId === "platform") {
      groupName = "Platform";
    } else if (trackId === "kagglehub") {
      groupName = "Library";
    } else {
      groupName = "Home";
    }

    let g = track.groups.find((x) => x.name === groupName);
    if (!g) {
      g = { name: groupName, items: [] };
      track.groups.push(g);
    }
    g.items.push({
      title: f.title,
      href: pageHref(f.rel, locale),
      rel: f.rel,
    });
  }

  const tracks = [];
  for (const meta of TRACK_META) {
    const t = byTrack.get(meta.id);
    if (!t) continue;
    const itemCount = t.groups.reduce((n, g) => n + g.items.length, 0);
    if (itemCount === 0 && meta.id !== "home") continue;
    for (const g of t.groups) {
      g.items.sort((a, b) => a.title.localeCompare(b.title));
    }
    tracks.push({
      id: t.id,
      name: t.name,
      badge: t.badge,
      groups: t.groups,
      count: itemCount,
    });
  }
  return tracks;
}

function enhanceCode(html) {
  return html
    .replace(
      /<pre><code class="language-([^"]*)">([\s\S]*?)<\/code><\/pre>/g,
      (_, lang, code) =>
        `<div class="code-block"><div class="code-bar"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="lang">${htmlEscape(lang || "text")}</span><button type="button" class="copy-btn" data-copy>Copy</button></div><pre><code class="language-${htmlEscape(lang)}">${code}</code></pre></div>`,
    )
    .replace(
      /<pre><code>([\s\S]*?)<\/code><\/pre>/g,
      (_, code) =>
        `<div class="code-block"><div class="code-bar"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="lang">text</span><button type="button" class="copy-btn" data-copy>Copy</button></div><pre><code>${code}</code></pre></div>`,
    );
}

function tocFromHtml(html) {
  const items = [];
  const re = /<h([23])\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g;
  let m;
  while ((m = re.exec(html))) {
    const text = m[3].replace(/<[^>]+>/g, "").trim();
    if (text) items.push({ level: Number(m[1]), id: m[2], text });
  }
  if (items.length < 1) return "";
  return `<nav class="toc"><div class="toc-title">On this page</div><ul>${items
    .map(
      (it) =>
        `<li class="l${it.level}"><a href="#${htmlEscape(it.id)}">${htmlEscape(it.text)}</a></li>`,
    )
    .join("")}</ul></nav>`;
}

function postProcessHtml(html, fromRel, locale) {
  return html.replace(/href="([^"]+\.md)(#[^"]*)?"/g, (full, href, hash = "") => {
    if (/^https?:\/\//i.test(href) || href.startsWith("#")) return full;
    const dir = path.posix.dirname(fromRel.replace(/\\/g, "/"));
    let target = href.replace(/^\.\//, "");
    if (target.startsWith("../") || !target.startsWith("/")) {
      target = path.posix.normalize(path.posix.join(dir === "." ? "" : dir, target));
    }
    target = target.replace(/^\/+/, "");
    const out = pageHref(target.endsWith(".md") ? target : target + ".md", locale);
    return `href="${out}${hash || ""}"`;
  });
}

function loadPages(rootDir) {
  const files = walk(rootDir);
  const pages = [];
  for (const abs of files) {
    const rel = path.relative(rootDir, abs).replace(/\\/g, "/");
    let md = fs.readFileSync(abs, "utf8");
    if (isHtmlDoc(md)) continue;
    md = md.replace(/^<!-- kaggle-docs:[\s\S]*?-->\n*/m, "");
    md = md.replace(/^<!-- modal-docs:[\s\S]*?-->\n*/m, "");
    const title = titleFromMd(md, humanize(path.basename(rel, ".md")));
    pages.push({ abs, rel, md, title });
  }
  return pages;
}

function pageHref(rel, locale) {
  return asset(relToHtml(rel), locale);
}


function renderNavHtml(tracks, activeRel) {
  return P.renderNavHtmlFull(tracks, activeRel, PREFERRED);
}
function renderChipsHtml(tracks, activeRel) {
  return P.renderChipsHtmlFull(tracks, activeRel, 12);
}

function layout({ locale, title, bodyHtml, navHtml, chipsHtml, tocHtml, rel, ui, mtBanner, crumbHtml, pagerHtml }) {
  const enHref = asset(relToHtml(rel || "index.md"), "en");
  const zhHref = asset(relToHtml(rel || "index.md"), "zh");
  const activeEn = locale === "en" ? " active" : "";
  const activeZh = locale === "zh" ? " active" : "";
  const langAttr = locale === "zh" ? "zh-CN" : "en";
  const desc = htmlEscape(ui.homeLead || title || "");
  return `<!DOCTYPE html>
<html lang="${langAttr}" data-locale="${locale}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="${desc}" />
  <meta name="color-scheme" content="dark" />
  <meta name="theme-color" content="#08090c" />
  <title>${htmlEscape(title)} · ${htmlEscape(ui.brand || "Docs")}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/styles/github-dark.min.css" />
  <link rel="stylesheet" href="${asset("assets/site.css")}" />
  <link rel="alternate" hreflang="en" href="${enHref}" />
  <link rel="alternate" hreflang="zh-CN" href="${zhHref}" />
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="progress" aria-hidden="true"></div>
  <header class="topbar">
    <div class="topbar-inner">
      <button type="button" class="menu-btn" id="menuBtn" aria-label="${htmlEscape(ui.menu || "Menu")}">${htmlEscape(ui.menu || "Menu")}</button>
      <a class="brand" href="${asset("index.html", locale)}">
        <span class="brand-mark">K</span>
        <span class="brand-text">${htmlEscape(ui.brand || "Docs")}</span>
        <span class="brand-v">${htmlEscape(ui.brandSub || "mirror")}</span>
      </a>
      <nav class="chips" id="trackChips" aria-label="Tracks">${chipsHtml || ""}</nav>
      <div class="lang-switch" role="group" aria-label="Language">
        <a class="lang-btn${activeEn}" href="${enHref}" data-lang-set="en" hreflang="en">${htmlEscape(ui.langEn || "EN")}</a>
        <a class="lang-btn${activeZh}" href="${zhHref}" data-lang-set="zh" hreflang="zh-CN">${htmlEscape(ui.langZh || "中文")}</a>
      </div>
      <a class="top-link" href="${OFFICIAL}" rel="noopener" target="_blank">${htmlEscape(ui.official || "Official ↗")}</a>
    </div>
  </header>
  <div class="shell">
    <aside class="sidebar" id="sidebar">
      <div class="side-head">
        <div class="search-wrap">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
          <input class="search" id="search" type="search" placeholder="${htmlEscape(ui.searchPlaceholder || "Search…")}" autocomplete="off" />
          <span class="search-kbd" aria-hidden="true">/</span>
        </div>
        <p class="side-label">${htmlEscape(ui.learningPath || "Browse docs")}</p>
      </div>
      <nav class="nav" id="nav" data-active-rel="${htmlEscape(rel || "")}" aria-label="Docs">${navHtml}</nav>
      <div class="side-foot">${htmlEscape(ui.footer || "")}</div>
    </aside>
    <button type="button" class="backdrop" id="backdrop" aria-label="Close menu"></button>
    <div class="main" id="main">
      ${mtBanner || ""}
      <div class="crumb">${crumbHtml || ""}</div>
      <div class="content-wrap">
        <article class="content prose">${bodyHtml}</article>
        ${tocHtml || ""}
      </div>
      ${pagerHtml || ""}
      <footer class="page-foot">${htmlEscape(ui.footer || "")}</footer>
    </div>
  </div>
  ${P.kbdHelpHtml()}
  <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/highlight.min.js"></script>
  <script src="${asset("assets/site.js")}"></script>
</body>
</html>`;
}

function copyAssets() {
  const out = path.join(DIST, "assets");
  ensureDir(out);
  for (const f of ["site.css", "site.js"]) {
    fs.copyFileSync(path.join(__dirname, "site-assets", f), path.join(out, f));
  }
  fs.copyFileSync(path.join(__dirname, "i18n", "ui.json"), path.join(out, "ui.json"));
  ensureDir(path.join(DIST, "meta"));
  for (const f of ["llms.txt", "list.json"]) {
    const src = path.join(ROOT, "docs", f);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(DIST, "meta", f));
  }
}

function buildLocale(locale, pages, navTracks) {
  const sync = locale === "zh" ? "每日与 kaggle.com 同步" : "synced daily from kaggle.com";
  const ui = P.enrichUi(UI[locale] || UI.en, locale, sync);
  const outRoot = locale === "zh" ? path.join(DIST, "zh") : DIST;
  ensureDir(outRoot);
  const flat = P.flattenNav(navTracks);
  const homeHref = asset("index.html", locale);
  let n = 0;
  for (const page of pages) {
    const isHome = page.rel === "index.md";
    const title = isHome ? (locale === "zh" ? "首页" : "Home") : page.title;
    const navHtml = renderNavHtml(navTracks, page.rel);
    const chipsHtml = renderChipsHtml(navTracks, page.rel);
    let body, toc = "";
    if (isHome) {
      body = P.renderHomeBody(navTracks, ui, {
        pageCount: pages.length,
        localeCount: 2,
        officialUrl: OFFICIAL,
        syncNote: sync,
        llmsHref: asset("llms.txt"),
        llmsFullHref: asset("llms-full.txt"),
      });
    } else {
      marked.setOptions({ gfm: true, breaks: false });
      body = marked.parse(normalizeMdxMarkdown(page.md));
      body = P.addHeadingIds(body);
      body = enhanceCode(body);
      body = postProcessHtml(body, page.rel, locale);
      toc = tocFromHtml(body);
    }
    const meta = P.findActiveMeta(navTracks, page.rel);
    meta.title = title;
    const crumbHtml = P.renderCrumb(ui, meta, isHome, homeHref);
    const pagerHtml = isHome ? "" : P.renderPager(flat, page.rel, ui);
    const mtBanner =
      locale === "zh" && !isHome && ui.mtBanner
        ? `<div class="mt-banner">${htmlEscape(ui.mtBanner)} <a href="${asset(relToHtml(page.rel), "en")}">${htmlEscape(ui.mtViewEn || "View English")}</a></div>`
        : "";
    const html = layout({ locale, title, bodyHtml: body, navHtml, chipsHtml, tocHtml: toc, rel: page.rel, ui, mtBanner, crumbHtml, pagerHtml });
    const outFile = path.join(outRoot, relToHtml(page.rel));
    ensureDir(path.dirname(outFile));
    fs.writeFileSync(outFile, html);
    n++;
  }
  return n;
}

function main() {
  fs.rmSync(DIST, { recursive: true, force: true });
  ensureDir(DIST);
  copyAssets();
  const enPages = loadPages(EN_PAGES);
  if (!enPages.length) { console.error("No EN pages"); process.exit(1); }
  const zhPages = enPages.map((p) => {
    const zhAbs = path.join(ZH_PAGES, p.rel);
    if (fs.existsSync(zhAbs)) {
      let md = fs.readFileSync(zhAbs, "utf8");
      md = md.replace(/^<!--[\s\S]*?-->\n*/m, "");
      if (!isHtmlDoc(md) && md.trim().length > 20) {
        return { ...p, md, title: titleFromMd(md, p.title) };
      }
    }
    return { ...p };
  });
  const enNav = buildNav(enPages, "en");
  const zhNav = buildNav(zhPages, "zh");
  fs.writeFileSync(path.join(DIST, "assets", "nav.json"), JSON.stringify(enNav, null, 2));
  fs.writeFileSync(path.join(DIST, "assets", "nav.zh.json"), JSON.stringify(zhNav, null, 2));
  const nEn = buildLocale("en", enPages, enNav);
  const nZh = buildLocale("zh", zhPages, zhNav);
  console.log(`[en] ${nEn} pages — tracks ${enNav.length}`);
  console.log(`[zh] ${nZh} pages`);
  
  // --- llmstxt.org artifacts (llms.txt + llms-full.txt) ---
  try {
    const llmsPages = (typeof enPages !== "undefined" ? enPages : typeof pages !== "undefined" ? pages : [])
      .filter((p) => p && p.rel && p.md)
      .map((p) => ({ rel: p.rel, title: p.title, md: p.md }));
    const llmsNav = (typeof enNav !== "undefined" ? enNav : typeof nav !== "undefined" ? nav : typeof navTracks !== "undefined" ? navTracks : null);
    const llmsResult = writeLlmsArtifacts({
      dist: DIST,
      pages: llmsPages,
      base: BASE,
      origin: process.env.SITE_ORIGIN || "https://xiaoqianran.github.io",
      brand: 'Kaggle Docs',
      description: 'Unofficial mirror of Kaggle platform docs, CLI/API, Agent Skills, and KaggleHub.',
      officialUrl: 'https://www.kaggle.com/docs',
      repo: 'kaggle-docs',
      nav: llmsNav,
    });
    console.log(
      `[llms] llms.txt + llms-full.txt — ${llmsResult.pageCount} pages, full=${Math.round(llmsResult.fullBytes / 1024)}KB` +
        (llmsResult.fullTruncated ? " (truncated)" : ""),
    );
  } catch (err) {
    console.warn("[llms] failed:", err?.message || err);
  }

  console.log(`Built locales en+zh -> ${DIST} (BASE=${BASE || "/"})`);
}
main();
