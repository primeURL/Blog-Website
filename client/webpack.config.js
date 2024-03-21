const path = require('path');

module.exports = {
  // Other webpack config options...
  resolve: {
    fallback: {
      "fs": false, // or require.resolve("browserify-fs")
      "path": require.resolve("path-browserify")
      // Add other core modules here as needed
    }
  }
};