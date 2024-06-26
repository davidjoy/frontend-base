const ConfigPreset = require('./ConfigPreset');

const searchFilepaths = [process.cwd()];

const eslint = new ConfigPreset({
  defaultFilename: '.eslintrc.js',
  searchFilenames: ['.eslintrc', '.eslintrc.js'],
  searchFilepaths,
});

// This will be removed and replace "eslint" once all MFEs are ready
const eslintNext = new ConfigPreset({
  defaultFilename: '.eslintrc.next.js',
  searchFilenames: ['.eslintrc.next', '.eslintrc.next.js'],
  searchFilepaths,
});

const jest = new ConfigPreset({
  defaultFilename: 'jest.config.js',
  searchFilenames: ['jest.config.js'],
  searchFilepaths,
});

const webpackDevServer = new ConfigPreset({
  defaultFilename: 'webpack.dev.config.js',
  searchFilenames: ['webpack.dev.config.js'],
  searchFilepaths,
});

const webpackDevServerStage = new ConfigPreset({
  defaultFilename: 'webpack.dev-stage.config.js',
  searchFilenames: ['webpack.dev-stage.config.js'],
  searchFilepaths,
});

const webpack = new ConfigPreset({
  defaultFilename: 'webpack.prod.config.js',
  searchFilenames: ['webpack.prod.config.js'],
  searchFilepaths,
});

module.exports = {
  eslint,
  'eslint-next': eslintNext, // This will be removed and replace "eslint" once all MFEs are ready
  jest,
  webpack,
  webpackDevServer,
  'webpack-dev': webpackDevServer,
  'webpack-dev-server': webpackDevServer,
  webpackDevServerStage,
  'webpack-dev-server-stage': webpackDevServerStage,
  'webpack-dev-stage': webpackDevServerStage,
  'webpack-prod': webpack,
};
