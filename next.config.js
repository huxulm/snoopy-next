var config = {
  pageExtenstions: ['js', 'jsx'],
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      return config;
    }
    config.plugins = config.plugins || [];
    return config;
  },
};

if (process.env.BUNDLE_ANALYZE) {
  const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
  config = withBundleAnalyzer({
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: '../../bundles/server.html'
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: '../bundles/client.html'
      }
    },
    ...config
  });
}

module.exports = config;
