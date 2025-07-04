const HTMLWebpackPlugins = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const production = process.env.NODE_ENV === "production";

module.exports = {
  entry: path.resolve(__dirname, "..", "./src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "..", "./dist"),
    filename: production
      ? "static/scripts/[name].[contenthash].js"
      : "static/scripts/[name].js",
    publicPath: "/",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|webp)$/,
        type: "asset/resource",
        generator: {
          filename: "static/images/[hash][ext][query]",
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "static/fonts/[hash][ext][query]",
        },
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack", "url-loader"],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          production ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]__[hash:base64:5]",
                namedExport: false,
                auto: /\.module\.\w+$/i,
              },
              importLoaders: 2,
            },
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts", ".json"],
  },
  plugins: [
    new HTMLWebpackPlugins({
      template: path.resolve(__dirname, "..", "./public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "static/styles/[name].[contenthash].css",
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
    }),
    new ReactRefreshWebpackPlugin(),
  ],
};
