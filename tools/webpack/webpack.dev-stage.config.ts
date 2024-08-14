// This is the dev Webpack config. All settings here should prefer a fast build
// time at the expense of creating larger, unoptimized bundles.
import { transform } from '@formatjs/ts-transformer';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import PostCssAutoprefixerPlugin from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import path from 'path';
import PostCssCustomMediaCSS from 'postcss-custom-media';
import PostCssRTLCSS from 'postcss-rtlcss';
import { merge } from 'webpack-merge';

import getLocalAliases from './getLocalAliases';
import commonConfig from './webpack.common.config';

const aliases = getLocalAliases();
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';

const config = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    publicPath: PUBLIC_PATH,
  },
  resolve: {
    alias: aliases,
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    // Specify file-by-file rules to Webpack. Some file-types need a particular kind of loader.
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [
          /src/,
          path.resolve(process.cwd(), './site.config.tsx'),
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
    https: true,
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
});

export default config;