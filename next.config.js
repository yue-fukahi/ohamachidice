/** @type {import("next").NextConfig} */

const urlPrefix = process.env.URL_PREFIX ? "/" + process.env.URL_PREFIX : "";
const nextConfig = {
  assetPrefix: urlPrefix,
  basePath: urlPrefix,
  trailingSlash: true,
  publicRuntimeConfig: { urlPrefix },

  reactStrictMode: true,
  images: {
    disableStaticImages: true,
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config
  },
}

module.exports = nextConfig
