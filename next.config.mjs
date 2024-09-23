/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverComponentsExternalPackages: ['ably', 'mongoose'],
      turbo: {
        rules: {
          '*.svg': {
            loaders: ['@svgr/webpack'],
            as: '*.js',
          },
        },
        resolveAlias: {
          underscore: 'lodash',
          mocha: { browser: 'mocha/browser-entry.js' },
        },
        resolveExtensions: [
          '.mdx',
          '.tsx',
          '.ts',
          '.jsx',
          '.js',
          '.mjs',
          '.json',
        ],
        moduleIdStrategy: 'deterministic',
      }
    }
  };
  
  module.exports = nextConfig;
  