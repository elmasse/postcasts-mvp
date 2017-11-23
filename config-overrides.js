const { injectBabelPlugin } = require('react-app-rewired');

module.exports = function override(config, env) {
  config = injectBabelPlugin('emotion', config);

  config.plugins = config.plugins.filter(p => p.constructor.name !== 'SWPrecacheWebpackPlugin')

  return config;
};
