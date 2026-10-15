#!/usr/bin/env node
/**
 * Refresh tools/catalog.json from the public VaneTools llms-full.txt feed.
 *
 * Data policy: public metadata only (name / type / detail-page URL / website).
 * No rankings, no internal data, no secrets. Deterministic output (source order
 * preserved) so diffs stay reviewable.
 *
 * Usage: node scripts/refresh-catalog.mjs
 */
import { writeFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = 'https://vanetools.com/llms-full.txt';
const ENDPOINT = 'https://vanetools.com/mcp';
const HOMEPAGE = 'https://vanetools.com';

const res = await fetch(SOURCE, { headers: { 'user-agent': 'vanetools-directory-catalog/1.0' } });
if (!res.ok) {
  console.error(`fetch failed: ${res.status} ${res.statusText}`);
  process.exit(1);
}
const text = await res.text();

// Line shape:
// - Name (type: https://vanetools.com/<type-path>/<slug>) — description — website: https://...
// The name segment may contain its own parentheses (e.g. "skill(not official)").
const lineRe = /^- (.+) \(([a-z ]+?): (https:\/\/[^)\s]+)\) — (.*?)(?: — website: (\S+))?$/;
const counts = Object.create(null);
const resources = [];
let skipped = 0;

for (const line of text.split('\n')) {
  if (!line.startsWith('- ')) continue;
  const m = lineRe.exec(line.trim());
  if (!m) { skipped++; continue; }
  const [, name, rawType, url, , website] = m;
  const type = rawType.trim();
  counts[type] = (counts[type] ?? 0) + 1;
  resources.push([name, type, url, website ?? null]);
}

if (resources.length < 1000) {
  console.error(`sanity check failed: only ${resources.length} resources parsed (expected tens of thousands) — source format may have changed`);
  process.exit(1);
}

const generatedAt = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
const countsJson = JSON.stringify(counts, null, 2)
  .split('\n').map((l, i) => (i === 0 ? l : '  ' + l)).join('\n');
const body = resources.map(r => '    ' + JSON.stringify(r)).join(',\n');

const out = `{
  "name": "vanetools-directory-catalog",
  "version": 1,
  "description": "Public index of the VaneTools AI resources catalog. Metadata only: name, type, detail-page URL, official website. Descriptions live on the detail pages.",
  "generatedAt": "${generatedAt}",
  "source": "${SOURCE}",
  "endpoint": "${ENDPOINT}",
  "homepage": "${HOMEPAGE}",
  "license": "MIT",
  "total": ${resources.length},
  "counts": ${countsJson},
  "fields": ["name", "type", "url", "website"],
  "resources": [
${body}
  ]
}
`;

const target = join(ROOT, 'tools', 'catalog.json');
writeFileSync(target, out);

const kb = Math.round(readFileSync(target).length / 1024);
console.log(`catalog.json written: ${resources.length} resources, ${Object.keys(counts).length} types, ${kb} KB`);
console.log('counts:', JSON.stringify(counts));
if (skipped > 0) console.log(`(skipped ${skipped} unparseable list lines)`);
