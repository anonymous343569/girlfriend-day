import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const PORT = 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.mjs':  'application/javascript',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.ico':  'image/x-icon',
  '.avif': 'image/avif',
  '.jpeg': 'image/jpeg',
  '.jpg':  'image/jpeg',
  '.png':  'image/png',
  '.svg':  'image/svg+xml',
  '.webp': 'image/webp',
  '.gif':  'image/gif',
  '.json': 'application/json',
  '':      'text/css',   // for css2 file (no extension = Google Fonts CSS)
};

function resolvePath(urlRaw) {
  const [urlPath] = urlRaw.split('?');

  // Root → index.html
  if (urlPath === '/' || urlPath === '') return path.join(ROOT, 'index.html');

  // Direct file lookup
  const candidate = path.join(ROOT, urlPath);
  if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;

  // Fallback: index.html for SPA routing
  return path.join(ROOT, 'index.html');
}

const server = http.createServer((req, res) => {
  const filePath = resolvePath(req.url);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] ?? 'application/octet-stream';

  // Security headers that Next.js expects
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(`[404] ${req.url}`);
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`404 Not Found: ${req.url}`);
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('\n╔═══════════════════════════════════════╗');
  console.log('║  🌸 Girlfriend Day — Local Server     ║');
  console.log('╠═══════════════════════════════════════╣');
  console.log(`║  http://localhost:${PORT}               ║`);
  console.log('╚═══════════════════════════════════════╝\n');
});

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is in use. Kill existing server or change PORT.`);
  }
});
