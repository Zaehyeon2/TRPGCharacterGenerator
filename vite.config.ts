import react from '@vitejs/plugin-react';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/TRPGCharaterGenerator/',
  plugins: [
    react(),
    {
      name: 'configure-cors',
      configureServer: (server) => {
        server.middlewares.use('/manifest.json', (_req, res, next) => {
          res.setHeader('Access-Control-Allow-Origin', '/*');
          res.setHeader('Access-Control-Allow-Methods', 'GET');
          res.setHeader(
            'Access-Control-Allow-Headers',
            'X-Requested-With, content-type, Authorization',
          );
          next();
        });
      },
    },
    splitVendorChunkPlugin(),
    nodePolyfills({
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
  ],
});
