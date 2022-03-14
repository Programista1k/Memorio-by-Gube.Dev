const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = {
    mode: "development",
    entry: "./src/scripts/app.ts",
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist",
    },
    devtool: "inline-source-map",
    devServer: {
        static: {
            directory: path.join(__dirname),
        },
        client: {
            logging: "none",
        },
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.ts(x)?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [new CleanWebpackPlugin()],
};

module.exports = config;
