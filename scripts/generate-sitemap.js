#!/usr/bin/env node
/**
 * Generates public/sitemap.xml from the actual route tree.
 *
 * The sitemap used to be hand-maintained and drifted: by Aug 2026 it listed two URLs
 * that 404'd and was missing seven live pages, including both nomad-relevant ones.
 * Run this after adding or removing a page:  node scripts/generate-sitemap.js
 *
 * lastmod comes from each route's last git commit date — real dates, not "today for
 * everything", which Google learns to distrust.
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const ORIGIN = 'https://bamboovalleyphuket.com'
const LOCALES = ['en', 'th', 'ru', 'zh']
const ROOT = path.join(__dirname, '..')
const LOCALE_DIR = path.join(ROOT, 'src/app/[locale]')

// Routes deliberately kept out of the sitemap.
const EXCLUDE = new Set([
  '/events/kungfu-family', // dated past event (May 2) — don't ask Google to index it
  '/blog/join-our-team',   // retired 2026-08-09, 301s to /careers/teacher (see public/_redirects)
])

function walk(dir, base = '') {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const route = `${base}/${entry.name}`
    const full = path.join(dir, entry.name)
    if (fs.existsSync(path.join(full, 'page.tsx'))) out.push(route)
    out.push(...walk(full, route))
  }
  return out
}

function lastmod(file) {
  try {
    const d = execSync(`git log -1 --format=%cI -- "${file}"`, { cwd: ROOT }).toString().trim()
    if (d) return d.split('T')[0]
  } catch {}
  return new Date().toISOString().split('T')[0]
}

const routes = ['', ...walk(LOCALE_DIR)]
  .filter(r => !EXCLUDE.has(r))
  .sort()

const entries = []
for (const route of routes) {
  const src = path.join(LOCALE_DIR, route, 'page.tsx')
  const mod = lastmod(src)
  for (const locale of LOCALES) {
    entries.push({ loc: `${ORIGIN}/${locale}${route}/`, mod, route, locale })
  }
}

// Hand-written static page outside the [locale] tree. Single-language by design.
if (fs.existsSync(path.join(ROOT, 'public/careers/teacher/index.html'))) {
  entries.push({
    loc: `${ORIGIN}/careers/teacher/`,
    mod: lastmod('public/careers/teacher/index.html'),
    route: '/careers/teacher',
    locale: null,
  })
}

// hreflang: every locale of a route points at its siblings, so Google serves the
// right language instead of picking one and treating the rest as duplicates.
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
]
for (const e of entries) {
  xml.push('  <url>')
  xml.push(`    <loc>${e.loc}</loc>`)
  xml.push(`    <lastmod>${e.mod}</lastmod>`)
  if (e.locale) {
    for (const l of LOCALES) {
      xml.push(`    <xhtml:link rel="alternate" hreflang="${l}" href="${ORIGIN}/${l}${e.route}/"/>`)
    }
    xml.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}/en${e.route}/"/>`)
  }
  xml.push('  </url>')
}
xml.push('</urlset>')

fs.writeFileSync(path.join(ROOT, 'public/sitemap.xml'), xml.join('\n') + '\n')
console.log(`sitemap.xml: ${entries.length} urls across ${routes.length} routes x ${LOCALES.length} locales`)
console.log(`excluded: ${[...EXCLUDE].join(', ') || 'none'}`)
