// Minimal static server for local preview:  npm run serve  ->  http://localhost:8080
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "dist");
const PORT = process.env.PORT || 8080;
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json",
};

http
  .createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url.split("?")[0]);
    let file = path.join(ROOT, urlPath);
    if (urlPath.endsWith("/")) file = path.join(file, "index.html");
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      // try adding index.html, else 404 page
      const withIndex = path.join(ROOT, urlPath, "index.html");
      if (fs.existsSync(withIndex)) file = withIndex;
      else {
        res.writeHead(404, { "Content-Type": "text/html" });
        const nf = path.join(ROOT, "404.html");
        return res.end(fs.existsSync(nf) ? fs.readFileSync(nf) : "Not found");
      }
    }
    const ext = path.extname(file);
    res.writeHead(200, { "Content-Type": TYPES[ext] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  })
  .listen(PORT, () => console.log(`Serving dist/ at http://localhost:${PORT}`));
