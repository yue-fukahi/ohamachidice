/** @type {import("next").NextConfig} */

const urlPrefix = process.env.URL_PREFIX ? "/" + process.env.URL_PREFIX : "";

const nextConfig = {
  assetPrefix: urlPrefix,
  basePath: urlPrefix,
  trailingSlash: true,
  publicRuntimeConfig: { urlPrefix },

  reactStrictMode: true,
  images: {
    // SVG を @svgr/webpack で React コンポーネントとして扱うため、
    // Next.js の静的画像インポートを無効にする
    disableStaticImages: true,
  },

  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

module.exports = nextConfig;
