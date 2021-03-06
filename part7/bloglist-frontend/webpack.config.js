/* eslint-disable */
const path = require("path");
const webpack = require("webpack");

const config = (env, argv) => {
  const backend_url =
    argv.mode === "production"
      ? "https://enigmatic-river-91899.herokuapp.com"
      : "http://localhost:3003";

  return {
    entry: ["@babel/polyfill", "./src/index.js"],
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "main.js"
    },
    devServer: {
      contentBase: path.resolve(__dirname, "build"),
      compress: true,
      port: 3000,
      historyApiFallback: true
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          query: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-proposal-class-properties", "istanbul"]
          }
        },
        {
          test: /\.css$/,
          loaders: ["style-loader", "css-loader"]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ["file-loader"]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ["file-loader"]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url)
      })
    ]
  };
};

module.exports = config;
