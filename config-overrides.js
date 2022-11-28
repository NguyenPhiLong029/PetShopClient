const path = require('path');

module.exports = {
  webpack: function (config, env) {
    config.ignoreWarnings = [/Failed to parse source map/];
    // Fix issue relate to react-dnd and react 17
    // https://github.com/react-dnd/react-dnd/issues/3433
    config.resolve = {
      ...config.resolve,
      alias: {
        'react/jsx-runtime': 'react/jsx-runtime.js',
        'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
        src: path.resolve(__dirname, 'src')
      }
    };
    return config;
  },
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);

      config.client = {
        overlay: false
      };

      return config;
    };
  }
};
