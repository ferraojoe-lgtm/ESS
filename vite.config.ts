import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  // Read or default version
  let appVersion = String(Date.now());
  try {
    const versionPath = path.resolve(__dirname, 'public/version.json');
    if (fs.existsSync(versionPath)) {
      const data = JSON.parse(fs.readFileSync(versionPath, 'utf-8'));
      appVersion = String(data.version);
    }
  } catch (e) {
    // Graceful fallback
  }

  // For custom domains (like expertstandardsolution.com), the base path must be '/' (absolute).
  // This is the standard, most reliable setting for React SPAs to prevent blank page issues.
  // If you ever need to deploy to a standard GitHub Pages subdirectory (e.g., username.github.io/repo),
  // you can set the environment variable VITE_BASE_PATH or set VITE_USE_REPO_BASE to 'true'.
  let basePath = '/';
  if (process.env.VITE_BASE_PATH) {
    basePath = process.env.VITE_BASE_PATH;
  } else if (process.env.GITHUB_REPOSITORY && process.env.VITE_USE_REPO_BASE === 'true') {
    const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
    basePath = `/${repoName}/`;
  }

  return {
    base: basePath,
    plugins: [react(), tailwindcss()],
    define: {
      __APP_VERSION__: JSON.stringify(appVersion),
    },
    build: {
      cssCodeSplit: true,
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules') && id.includes('firebase')) {
              return 'vendor-firebase';
            }
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
