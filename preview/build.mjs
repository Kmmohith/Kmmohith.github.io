// Offline preview build: bundles src/ with esbuild (framer-motion aliased to a shim)
// and compiles Tailwind v4 from the class names found in the source, then inlines
// everything into one self-contained HTML file.
import { build } from '/opt/npm-tools/node_modules/esbuild/lib/main.js'
import { compile } from '/opt/npm-tools/node_modules/tailwindcss/dist/lib.mjs'
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const out = path.join(root, 'preview', 'dist')
fs.mkdirSync(out, { recursive: true })

const js = await build({
  entryPoints: [path.join(root, 'src/main.jsx')],
  bundle: true,
  minify: true,
  write: false,
  format: 'iife',
  jsx: 'automatic',
  loader: { '.js': 'jsx', '.css': 'empty' },
  alias: { 'framer-motion': path.join(root, 'preview/motion-shim.jsx') },
  nodePaths: ['/opt/npm-tools/node_modules'],
  define: { 'process.env.NODE_ENV': '"production"' },
  logLevel: 'warning',
})

// Candidate extraction: every token-ish string in the sources.
const files = []
const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
    const p = path.join(d, e.name)
    if (e.isDirectory()) walk(p)
    else if (/\.(jsx?|html)$/.test(e.name)) files.push(p)
  })
walk(path.join(root, 'src'))
const candidates = new Set()
for (const f of files) {
  for (const t of fs.readFileSync(f, 'utf8').split(/[\s"'`{}()<>,;=]+/)) if (t) candidates.add(t)
}

const twBase = '/opt/npm-tools/node_modules/tailwindcss/'
const compiler = await compile(fs.readFileSync(path.join(root, 'src/index.css'), 'utf8'), {
  base: twBase,
  loadStylesheet: async (id) => {
    const p = id === 'tailwindcss' ? twBase + 'index.css' : path.join(twBase, id.replace('tailwindcss/', ''))
    return { path: p, base: twBase, content: fs.readFileSync(p, 'utf8') }
  },
})
const css = compiler.build([...candidates])

let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8')
const favicon = 'data:image/svg+xml,' + encodeURIComponent(fs.readFileSync(path.join(root, 'public/favicon.svg'), 'utf8').trim())
html = html
  .replace('href="/favicon.svg"', `href="${favicon}"`)
  .replace(/<!doctype html>/i, '<!DOCTYPE html>')
  .replace('</head>', `<style>${css}</style>\n  </head>`)
  .replace(
    '<script type="module" src="/src/main.jsx"></script>',
    () => `<script>${js.outputFiles[0].text.replace(/<\/script/gi, '<\\/script')}</script>`,
  )

fs.writeFileSync(path.join(out, 'index.html'), html)
console.log('wrote', path.join(out, 'index.html'), (html.length / 1024).toFixed(1) + ' KiB')
