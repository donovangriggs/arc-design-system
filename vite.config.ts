import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs';

function stencilEsmPlugin(): Plugin {
  const stencilEsmDir = path.resolve(
    __dirname,
    'node_modules/@arctech/core/dist/esm',
  );
  const servePrefix = '/stencil-esm/';

  return {
    name: 'stencil-esm',

    // Dev: serve entry files from the Stencil ESM directory
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url?.startsWith(servePrefix)) {
          const fileName = req.url.slice(servePrefix.length);
          const filePath = path.join(stencilEsmDir, fileName);
          if (fs.existsSync(filePath)) {
            _res.setHeader('Content-Type', 'application/javascript');
            fs.createReadStream(filePath).pipe(_res);
            return;
          }
        }
        next();
      });
    },

    // Build: copy entry files to the output
    async writeBundle(options) {
      const outDir = options.dir || path.resolve(__dirname, 'dist/stencil-esm');
      const destDir = path.resolve(
        typeof outDir === 'string' ? outDir : __dirname,
        'stencil-esm',
      );
      if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

      const files = fs.readdirSync(stencilEsmDir);
      for (const file of files) {
        if (file.endsWith('.entry.js') || file.startsWith('index-')) {
          fs.copyFileSync(
            path.join(stencilEsmDir, file),
            path.join(destDir, file),
          );
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), stencilEsmPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
