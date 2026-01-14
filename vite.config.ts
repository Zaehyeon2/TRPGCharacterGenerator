import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const config = {
    base: '/',
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
      nodePolyfills({
        protocolImports: true,
      }),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-mantine': ['@mantine/core', '@mantine/hooks'],
            'vendor-icons': ['@tabler/icons-react'],
          },
        },
      },
    },
    optimizeDeps: {
      include: ['@mantine/core', '@mantine/hooks', '@tabler/icons-react'],
    },
  };

  if (command === 'build' || mode !== 'development') {
    config.base = '/TRPGCharacterGenerator/';
  }
  return config;
});
