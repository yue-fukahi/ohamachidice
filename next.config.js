/** @type {import("next").NextConfig} */

// GitHub Pages のプロジェクトページ（/ohamachidice 配下）で配信するため、
// 本番ビルドのみパスのプレフィックスを付ける。開発サーバーはルート直下で動く。
const basePath = process.env.NODE_ENV === "production" ? "/ohamachidice" : "";

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,

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
