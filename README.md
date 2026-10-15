# VaneTools Directory — Open MCP Catalog & Satellite Docs

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Catalog](https://img.shields.io/badge/resources-38%2C182-blue)](tools/catalog.json)
[![MCP](https://img.shields.io/badge/MCP-remote%20endpoint-green)](https://vanetools.com/mcp)
[![Docs](https://img.shields.io/badge/docs-GitHub%20Pages-8A2BE2)](https://richardxu001.github.io/vanetools-directory/)

Open, machine-readable catalog behind the [VaneTools](https://vanetools.com) AI directory,
plus the MCP server manifest that lets any MCP client search all of it.

**一句话**：本仓库是 [VaneTools](https://vanetools.com)（38,182 条 AI 资源的双语导航站）的
公开目录数据 + MCP 端点接入样例。仓库本身不含站点代码。

## What's inside

| Path | What it is |
|---|---|
| [`tools/catalog.json`](tools/catalog.json) | Full public index: **38,182 resources** (app / prompt / skill / plugin / workflow / mcp / learning) with name, type, detail-page URL, official website. Metadata only. |
| [`server.json`](server.json) | MCP Registry manifest for the remote server `https://vanetools.com/mcp` (namespace `com.vanetools/vanetools-directory`). |
| [`examples/`](examples/) | Ready-to-paste configs: Claude Desktop, Cursor, VS Code, Smithery. |
| [`scripts/refresh-catalog.mjs`](scripts/refresh-catalog.mjs) | Regenerates `catalog.json` from the public feed. `node scripts/refresh-catalog.mjs` — no dependencies. |
| [`docs/`](docs/) | Source of the GitHub Pages site: connection guides, catalog browser, FAQ. |

## Connect in 30 seconds

The endpoint is **public and read-only — no API key, no auth**.

```json
{
  "mcpServers": {
    "vanetools": {
      "url": "https://vanetools.com/mcp"
    }
  }
}
```

- **Claude Desktop** — Settings → Developer → Edit Config → paste the JSON above → restart.
- **Cursor** — Settings → MCP → Add new global MCP server → paste the JSON above.
- **VS Code** — add it to `mcp.json` (see [`examples/vscode-mcp.json`](examples/vscode-mcp.json)).
- **Smithery** — published as [`richard-xu-auto/vanetools-directory`](https://smithery.ai/server/richard-xu-auto/vanetools-directory).

Full walkthrough with screenshots-free step-by-step instructions:
**[richardxu001.github.io/vanetools-directory/connect/](https://richardxu001.github.io/vanetools-directory/connect/)**

## Catalog stats

| Type | Count |
|---|---:|
| AI apps | 22,733 |
| Prompts | 6,170 |
| Skills | 4,893 |
| Plugins | 3,082 |
| Workflows | 989 |
| MCP servers | 278 |
| Learning resources | 37 |
| **Total** | **38,182** |

Regenerate: `node scripts/refresh-catalog.mjs` (pulls the public
[`llms-full.txt`](https://vanetools.com/llms-full.txt) feed; deterministic output, reviewable diffs).

## Data policy

- **Public metadata only**: names, types, detail-page URLs, official websites.
  Descriptions live on the [detail pages](https://vanetools.com/tools) — this repo deliberately
  does not mirror them (keeps the catalog lean and avoids content duplication).
- No rankings, no analytics, no private data, no secrets. The catalog is the same
  data already published in [`llms-full.txt`](https://vanetools.com/llms-full.txt), just structured.
- MIT licensed. Attribution appreciated but not required.

## Links

- Site: <https://vanetools.com>
- MCP endpoint: <https://vanetools.com/mcp>
- Official MCP Registry listing: `com.vanetools/vanetools-directory`
- These docs online: <https://richardxu001.github.io/vanetools-directory/>

## License

[MIT](LICENSE) © 2026 VaneTools
