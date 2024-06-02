/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')
/** @type {(env: any, arg: {mode: string}) => import('webpack').Configuration} **/
module.exports = (env: any, argv: any) => {
    const isProduction = argv.mode === 'production'
    const isAnalyze = Boolean(env?.analyze)
    /** @type {import('webpack').Configuration} **/
    const config = {
        optimization: {},
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js'],
            alias: {
                '@pages': path.resolve(__dirname, './src/pages')
            }
        },
        entry: ['./src/index.tsx'],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.(s[ac]ss|css)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: { sourceMap: !isProduction }
                        },
                        {
                            loader: 'sass-loader',
                            options: { sourceMap: !isProduction }
                        }
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: isProduction
                                    ? 'static/media/[name].[contenthash:6].[ext]'
                                    : '[path][name].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.(eot|ttf|woff|woff2)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: isProduction
                                    ? 'static/fonts/[name].[ext]'
                                    : '[path][name].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
        output: {
            filename: 'static/js/main.[contenthash:6].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/'
        },
        devServer: {
            // hot: true,
            port: 3000,
            host: '0.0.0.0',
            historyApiFallback: true,
            static: {
                directory: path.resolve(__dirname, 'public', 'index.html'),
                serveIndex: true,
                watch: true
            }
        },
        devtool: isProduction ? false : 'source-map',
        plugins: [
            new MiniCssExtractPlugin({
                filename: isProduction ? 'static/css/[name].[contenthash:6].css' : '[name].css'
            }),
            new Dotenv(),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'public',
                        to: '.',
                        filter: (name: string) => {
                            return !name.endsWith('index.html')
                        }
                    }
                ]
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html'),
                filename: 'index.html'
            }),
            new ESLintPlugin({
                extensions: ['.tsx', '.ts', '.js', '.jsx']
            })
        ]
    }
    if (isProduction) {
        config.plugins = [
            ...config.plugins,
            new webpack.ProgressPlugin(),

            new CompressionPlugin({
                test: /\.(css|js)$/,
                algorithm: 'brotliCompress'
            }),
            new CleanWebpackPlugin()
        ]
        if (isAnalyze) {
            config.plugins = [...config.plugins, new BundleAnalyzerPlugin()]
        }
        config.optimization = {
            minimizer: [
                `...`,
                new CssMinimizerPlugin() // minify css
            ]
        }
    }
    return config
}
