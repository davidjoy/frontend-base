// This is the dev Webpack config. All settings here should prefer a fast build
// time at the expense of creating larger, unoptimized bundles.
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const PostCssAutoprefixerPlugin = require('autoprefixer');
const PostCssRTLCSS = require('postcss-rtlcss');
const PostCssCustomMediaCSS = require('postcss-custom-media');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { transform } = require('@formatjs/ts-transformer');
const getLocalAliases = require('./getLocalAliases');

const aliases = getLocalAliases();
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../shell/index'),
  },
  output: {
    path: path.resolve(process.cwd(), './dist'),
    publicPath: PUBLIC_PATH,
  },
  resolve: {
    alias: {
      ...aliases,
      'env.config': path.resolve(process.cwd(), './env.config'),
    },
    fallback: {
      // This causes the system to return an empty object if it can't find an env.config.js file in
      // the application being built.
      'env.config': false,
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  ignoreWarnings: [
    // Ignore warnings raised by source-map-loader.
    // some third party packages may ship miss-configured sourcemaps, that interrupts the build
    // See: https://github.com/facebook/create-react-app/discussions/11278#discussioncomment-1780169
    /**
     *
     * @param {import('webpack').WebpackError} warning
     * @returns {boolean}
     */
    function ignoreSourcemapsloaderWarnings(warning) {
      return (
        warning.module
        && warning.module.resource.includes('node_modules')
        && warning.details
        && warning.details.includes('source-map-loader')
      );
    },
  ],
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    // Specify file-by-file rules to Webpack. Some file-types need a particular kind of loader.
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [
          [
            /src/,
            path.resolve(process.cwd(), './env.config.tsx'),
            // /env.config/ // \.(js|jsx|ts|tsx)/,
          ]
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
      // We are not extracting CSS from the javascript bundles in development because extracting
      // prevents hot-reloading from working, it increases build time, and we don't care about
      // flash-of-unstyled-content issues in development.
      {
        test: /(.scss|.css)$/,
        use: [
          require.resolve('style-loader'), // creates style nodes from JS strings
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
  optimization: {
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
    // Generates an HTML file in the output directory.
    new HtmlWebpackPlugin({
      inject: true, // Appends script tags linking to the webpack bundles at the end of the body
      template: path.resolve(process.cwd(), 'public/index.html'),
      FAVICON_URL: process.env.FAVICON_URL || null,
      OPTIMIZELY_PROJECT_ID: process.env.OPTIMIZELY_PROJECT_ID || null,
      NODE_ENV: process.env.NODE_ENV || null,
    }),
    new ReactRefreshWebpackPlugin(),
  ],
  // This configures webpack-dev-server which serves bundles from memory and provides live
  // reloading.
  devServer: {
    host: '0.0.0.0',
    port: process.env.PORT || 8080,
    historyApiFallback: {
      index: path.join(PUBLIC_PATH, 'index.html'),
      disableDotRule: true,
    },
    // Enable hot reloading server. It will provide WDS_SOCKET_PATH endpoint
    // for the WebpackDevServer client so it can learn when the files were
    // updated. The WebpackDevServer client is included as an entry point
    // in the webpack development configuration. Note that only changes
    // to CSS are currently hot reloaded. JS changes will refresh the browser.
    hot: true,
    webSocketServer: 'ws',
    devMiddleware: {
      publicPath: PUBLIC_PATH,
    },
  },
};
