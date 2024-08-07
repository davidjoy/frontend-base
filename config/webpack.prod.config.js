// This is the prod Webpack config. All settings here should prefer smaller,
// optimized bundles at the expense of a longer build time.

const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge } = require('webpack-merge');
const CssNano = require('cssnano');
const NewRelicSourceMapPlugin = require('@edx/new-relic-source-map-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const PostCssAutoprefixerPlugin = require('autoprefixer');
const PostCssRTLCSS = require('postcss-rtlcss');
const PostCssCustomMediaCSS = require('postcss-custom-media');
const { transform } = require('@formatjs/ts-transformer');

const getLocalAliases = require('./getLocalAliases');
const HtmlWebpackNewRelicPlugin = require('../cli/plugins/html-webpack-new-relic-plugin');
const commonConfig = require('./webpack.common.config');

const extraPlugins = [];
if (process.env.ENABLE_NEW_RELIC !== 'false') {
  // Enable NewRelic logging only if the account ID is properly defined
  extraPlugins.push(new HtmlWebpackNewRelicPlugin({
    // This plugin fixes an issue where the newrelic script will break if
    // not added directly to the HTML.
    // We use non empty strings as defaults here to prevent errors for empty configs
    accountID: process.env.NEW_RELIC_ACCOUNT_ID || 'undefined_account_id',
    agentID: process.env.NEW_RELIC_AGENT_ID || 'undefined_agent_id',
    trustKey: process.env.NEW_RELIC_TRUST_KEY || 'undefined_trust_key',
    licenseKey: process.env.NEW_RELIC_LICENSE_KEY || 'undefined_license_key',
    applicationID: process.env.NEW_RELIC_APP_ID || 'undefined_application_id',
  }));
  extraPlugins.push(new NewRelicSourceMapPlugin({
    applicationId: process.env.NEW_RELIC_APP_ID,
    apiKey: process.env.NEW_RELIC_ADMIN_KEY,
    staticAssetUrl: process.env.BASE_URL,
    // upload source maps in prod builds only
    noop: typeof process.env.NEW_RELIC_ADMIN_KEY === 'undefined',
  }));
}

const aliases = getLocalAliases();

module.exports = merge(commonConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: process.env.PUBLIC_PATH || '/',
    clean: true, // Clean the output directory before emit.
  },
  resolve: {
    alias: aliases,
  },
  module: {
    // Specify file-by-file rules to Webpack. Some file-types need a particular kind of loader.
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [
          /src/,
        ],
        use: {
          loader: require.resolve('ts-loader'),
          options: {
            transpileOnly: true,
            compilerOptions: {
              noEmit: false,
            },
            getCustomTransformers() {
              return {
                before: [
                  transform({
                    overrideIdFn: '[sha512:contenthash:base64:6]',
                  }),
                ],
              };
            },
          },
        },
      },
      {
        test: /\.js$/,
        use: [
          require.resolve('source-map-loader'),
        ],
        enforce: 'pre',
      },
      // Webpack, by default, includes all CSS in the javascript bundles. Unfortunately, that means:
      // a) The CSS won't be cached by browsers separately (a javascript change will force CSS
      // re-download).  b) Since CSS is applied asyncronously, it causes an ugly
      // flash-of-unstyled-content.
      //
      // To avoid these problems, we extract the CSS from the bundles into separate CSS files that
      // can be included as <link> tags in the HTML <head> manually.
      //
      // We will not do this in development because it prevents hot-reloading from working and it
      // increases build time.
      {
        test: /(.scss|.css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'), // translates CSS into CommonJS
            options: {
              sourceMap: true,
              modules: {
                compileType: 'icss',
              },
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              postcssOptions: {
                plugins: [
                  PostCssAutoprefixerPlugin(),
                  PostCssRTLCSS(),
                  CssNano(),
                  PostCssCustomMediaCSS(),
                ],
              },
            },
          },
          require.resolve('resolve-url-loader'),
          {
            loader: require.resolve('sass-loader'), // compiles Sass to CSS
            options: {
              sourceMap: true,
              sassOptions: {
                includePaths: [
                  path.join(process.cwd(), 'node_modules'),
                  path.join(process.cwd(), 'src'),
                ],
                // silences compiler warnings regarding deprecation warnings
                quietDeps: true,
              },
            },
          },
        ],
      },
      // Webpack, by default, uses the url-loader for images and fonts that are required/included by
      // files it processes, which just base64 encodes them and inlines them in the javascript
      // bundles. This makes the javascript bundles ginormous and defeats caching so we will use the
      // file-loader instead to copy the files directly to the output directory.
      {
        test: /\.(woff2?|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: require.resolve('file-loader'),
      },
      {
        test: /favicon.ico$/,
        loader: require.resolve('file-loader'),
        options: {
          name: '[name].[ext]', // <-- retain original file name
        },
      },
      {
        test: /\.(jpe?g|png|gif)(\?v=\d+\.\d+\.\d+)?$/,
        loader: require.resolve('file-loader'),
      },
    ],
  },
  // New in Webpack 4. Replaces CommonChunksPlugin. Extract common modules among all chunks to one
  // common chunk and extract the Webpack runtime to a single runtime chunk.
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      '...',
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
          options: {
            encodeOptions: {
              ...['png', 'jpeg', 'jpg'].reduce((accumulator, value) => (
                { ...accumulator, [value]: { progressive: true, quality: 65 } }
              ), {}),
              gif: {
                effort: 5,
              },
            },
          },
        },
      }),
    ],
  },
  // Specify additional processing or side-effects done on the Webpack output bundles as a whole.
  plugins: [
    // Writes the extracted CSS from each entry to a file in the output directory.
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
    }),
    // Generates an HTML file in the output directory.
    new HtmlWebpackPlugin({
      inject: true, // Appends script tags linking to the webpack bundles at the end of the body
      template: path.resolve(process.cwd(), 'public/index.html'),
      FAVICON_URL: process.env.FAVICON_URL || null,
      OPTIMIZELY_PROJECT_ID: process.env.OPTIMIZELY_PROJECT_ID || null,
      NODE_ENV: process.env.NODE_ENV || null,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
    ...extraPlugins,
  ],
});
