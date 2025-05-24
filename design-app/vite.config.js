import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import process from 'process/browser';
import { customComponentTagger } from './src/utils/componentTagger';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const empty = require.resolve('./src/empty.js');
import commonjs from 'vite-plugin-commonjs';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => ({  
  define: {
    'process.env': {},
    'process.platform': JSON.stringify('browser'),
    'process.version': JSON.stringify('v16.0.0'),
    global: 'globalThis'
  },  
  server: {
    host: "localhost",
    port: 8080,
    strictPort: false,
    watch: {
      usePolling: true,
      interval: 100
    },
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 8080,
      timeout: 120000
    },
    fs: {
      strict: false,
      allow: ['..']
    }
  },  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true
        })
      ]
    },
    include: [
      'buffer',
      'process',
      'events',
      'util',
      'netmask',
      'ipaddr.js'
    ],
    exclude: ['stream', 'crypto', 'path', 'child_process', 'os']
  },
  build: {    
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/node_modules/, /netmask/, /ipaddr\.js/, /node-forge/],
      requireReturnsDefault: 'auto',
      esmExternals: true
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'timeout-abort-controller': ['timeout-abort-controller'],
          'set-delayed-interval': ['set-delayed-interval'],
          'events': ['events'],
          'merge-options': ['merge-options'],
          'rate-limiter-flexible': ['rate-limiter-flexible'],
          'retimer': ['retimer'],
          'protobufjs': ['protobufjs', 'protobufjs/minimal', 'protobufjs/src/reader.js', 'protobufjs/src/reader_buffer.js']
        }
      }
    }
  },
  plugins: [
    commonjs({
      include: [/node_modules/, /cross-spawn/]
    }),
    tsconfigPaths(),
    react(),    
    NodeGlobalsPolyfillPlugin({
      process: true,
      buffer: true,
      events: true,
      crypto: true,
      module: true,
      util: true,
      dgram: true,
      net: true,
      child_process: true
    }),
    NodeModulesPolyfillPlugin(),
    mode === 'development' && customComponentTagger(),
  ].filter(Boolean),
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    mainFields: ['module', 'main', 'browser'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    preserveSymlinks: true,    alias: {
      '@': path.resolve(__dirname, 'src'),
      'stream': 'stream-browserify',
      'crypto': 'crypto-browserify',
      'path': 'path-browserify',
      'libp2p/user-agent': path.resolve(__dirname, 'src/shims/user-agent.js'),
      'protobufjs': path.join(__dirname, 'node_modules/protobufjs'),
      'protobufjs/minimal': path.join(__dirname, 'node_modules/protobufjs/minimal'),
      'protobufjs/src/reader.js': path.join(__dirname, 'node_modules/protobufjs/src/reader.js'),
      'protobufjs/src/reader': path.join(__dirname, 'node_modules/protobufjs/src/reader.js'),
      'protobufjs/src/reader_buffer.js': path.join(__dirname, 'node_modules/protobufjs/src/reader_buffer.js'),
      'protobufjs/src/reader_buffer': path.join(__dirname, 'node_modules/protobufjs/src/reader_buffer.js'),
      'protobufjs/src/writer.js': require.resolve('protobufjs/src/writer.js'),
      'protobufjs/src/writer': require.resolve('protobufjs/src/writer.js'),
      'protobufjs/src/writer_buffer.js': require.resolve('protobufjs/src/writer_buffer.js'),
      'protobufjs/src/writer_buffer': require.resolve('protobufjs/src/writer_buffer.js'),
      'timeout-abort-controller': require.resolve('timeout-abort-controller'),
      'events': 'events',
      'node:events': 'events',
      'merge-options': require.resolve('merge-options'),
      'rate-limiter-flexible': require.resolve('rate-limiter-flexible'),
      'retimer': require.resolve('retimer'),      
      'process': 'process/browser',      
      'buffer': 'buffer',      'dgram': path.join(__dirname, 'src/shims/dgram.js'),
      'module': path.join(__dirname, 'src/shims/module.js'),
      'child_process': path.resolve(__dirname, './src/empty.js'),
      'os': 'os-browserify/browser'
    }
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.js$/,
  },
  proxy: {
    '/socket.io': {
      target: 'http://localhost:3002',
      ws: true,
    },
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
      secure: false,
      rewrite: (path) => path
    },
    '/auth': {
      target: 'http://localhost:3001',
      changeOrigin: true,
      secure: false,
      rewrite: (path) => path
    }
  }
}))
