const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.node = {
    fs: "empty",
    tls: "empty",
    net: "empty"
  };
  return defaultConfig;
};
