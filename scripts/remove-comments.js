
const fs = require('fs')
const path = require('path')
let strip
try { strip = require('strip-comments') } catch (e) {
  console.error('strip-comments not installed. Run: npm i -D strip-comments')
  process.exit(1)
}

const roots = ['src', 'public', 'scripts']
const exts = new Set(['.js', '.jsx', '.css', '.html'])

function listFiles(dir) {
  const out = []
  if (!fs.existsSync(dir)) return out
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...listFiles(p))
    else if (exts.has(path.extname(entry.name))) out.push(p)
  }
  return out
}

function stripCss(content) {
  return content.replace(/\/\*[\s\S]*?\*\//g, '')
}

function stripHtml(content) {
  return content.replace(/<!--[\s\S]*?-->/g, '')
}

function processFile(file) {
  const ext = path.extname(file)
  const original = fs.readFileSync(file, 'utf8')
  let next = original
  try {
    if (ext === '.js' || ext === '.jsx') next = strip(next)
    else if (ext === '.css') next = stripCss(next)
    else if (ext === '.html') next = stripHtml(next)
  } catch (e) {
    console.warn('Failed to strip for', file, e.message)
    return false
  }
  if (next !== original) {
    fs.writeFileSync(file, next, 'utf8')
    return true
  }
  return false
}

let changed = 0
for (const root of roots) {
  const abs = path.join(process.cwd(), root)
  for (const f of listFiles(abs)) {
    if (processFile(f)) changed++
  }
}
console.log(`Comments removed from ${changed} file(s).`) 
