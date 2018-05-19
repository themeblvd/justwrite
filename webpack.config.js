const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: './assets/js/app.js'
    },
    plugins: [
        /*
         * Move compiled .scss to an actual .css file in
         * the final build.
         */
        new MiniCssExtractPlugin({
            filename: './assets/css/main.css'
        }),
        /*
         * Generate index.html page for the app.
         */
        new HtmlWebpackPlugin({
            title: 'My App',
            template: './src/index.html'
        })
    ],
    module: {
        rules: [
            /*
             * Process JavaScript files and run them
             * through babel.
             *
             * Note: The `babel-preset-react-app` is
             * important, to give us public class field
             * syntax (i.e. fat arrows and better this
             * binding).
             */
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    babelrc: false,
                    presets: ['babel-preset-react-app']
                }
            },
            /*
             * Process images that were imported from
             * JavaScript files.
             */
            {
                test: /\.(svg|png|jpg|gif)$/,
                issuer: /\.js/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './assets/img',
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            /*
             * Process Sass files, using the following
             * loaders:
             *
             * 1. sass-loader: Compiles the Sass into CSS.
             * 2. postcss-loader: Applies postcss and autoprefixer
             *    to CSS.
             * 3. css-loader: Gets all the assets from @import
             *    and url() from within the CSS.
             * 4. MiniCssExtractPlugin: Puts compiled CSS
             *    into a file, configured above.
             */
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            outputStyle:
                                process.env.NODE_ENV == 'production'
                                    ? 'compressed'
                                    : 'expanded'
                        }
                    }
                ]
            },
            /*
             * Process images that were extracted from
             * url() in .scss files, via `css-loader`.
             *
             * These need a custom public path so that
             * the URLs resolve properly from the final
             * CSS file.
             */
            {
                test: /\.(svg|png|jpg|gif)$/,
                issuer: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './assets/img',
                            name: '[name].[ext]',
                            publicPath: '../img'
                        }
                    }
                ]
            },
            /*
             * Process font files that were extracted from
             * url() in .scss files, via `css-loader`.
             */
            {
                test: /\.(ttf|woff|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './assets/font',
                            name: '[name].[ext]',
                            publicPath: '../font'
                        }
                    }
                ]
            }
        ]
    }
};
