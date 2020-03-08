const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[contenthash].bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 9000,
        watchContentBase: true
    },  // możemy automatycznie zobaczyc zmiany na stronie 
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss:[
                    autoprefixer()
                ]
            }
        }),
        new CleanWebpackPlugin(),
        new BrowserSyncPlugin({
            host: '0.0.0.0',  // zamiennie localhost w tym miejscu.
            port: 9100,
            proxy: 'html://localhost:9000'
        }, {
            reload: false
        })
    ],

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: { name: "[name].[ext]" }
                }
            },
            {
                test: /\.(html)$/,
                use: ["html-loader"]
            }
        ]
    }
}