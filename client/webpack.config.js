const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/main.ts",
  resolve: {
    extension: [".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src/app/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader", "angular2-template-loader"],
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      // Preventing the warning "System.import() is deprecated and will be removed soon. Use import() instead" from showing
      {
        test: /[\/\\]@angular[\/\\].+\.js$/,
        parser: { system: true },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new webpack.DefinePlugin({
      // global app config object
      config: JSON.stringify({
        apiUrl: "http://localhost:8500",
      }),
    }),
    // Preventing the warning "Critical dependency: the request of a dependency is an expression" from showing
    new webpack.ContextReplacementPlugin(
      /\@angular(\\|\/)core(\\|\/)fesm5/,
      path.resolve(__dirname, "src")
    ),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: true,
  },
  devServer: {
    historyApiFallback: true,
  },
};
