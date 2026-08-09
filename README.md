# Kaggle Docs Mirror

Unofficial mirror of **Kaggle documentation** for humans + AI agents.

## Sources

| Track | Source |
|-------|--------|
| Platform Docs | [kaggle.com/docs](https://www.kaggle.com/docs) (`.md` endpoints) + [llms.txt](https://www.kaggle.com/llms.txt) |
| CLI & API | [Kaggle/kaggle-cli](https://github.com/Kaggle/kaggle-cli) `docs/` |
| Agent Skills | [Kaggle/kaggle-cli](https://github.com/Kaggle/kaggle-cli) `skills/` |
| KaggleHub | [Kaggle/kagglehub](https://github.com/Kaggle/kagglehub) |

## Local

```bash
npm install --no-save marked@15
npm run fetch
npm run translate   # optional zh-CN cache
PAGES_BASE=/kaggle-docs npm run build
node scripts/serve-pages.mjs
```

## GitHub Actions

Daily fetch → hash-cached zh translation → build → GitHub Pages (`/kaggle-docs`).

Bot commits use `[skip ci]` to avoid loops.

## LLM / agent access ([llmstxt.org](https://llmstxt.org/))

| File | Purpose |
|------|---------|
| [`/llms.txt`](./llms.txt) | Curated page index (mirror URLs) |
| [`/llms-full.txt`](./llms-full.txt) | Full markdown corpus for ingestion |
| `/meta/llms-index.json` | Machine-readable page list |

Generated at build time from scraped pages.
