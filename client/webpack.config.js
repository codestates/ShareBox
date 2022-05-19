const webpack = require("webpack");
module.exports = {
  mode: "development",
  entry: {
    app: "",
  },
  output: {
    path: "",
    filename: "",
    publicPath: "",
  },
  module: {},
  plugins: [],
  optimization: {},
  resolve: {
    modules: ["node_modules"],
    fallback: {
      fs: false,
    },
    extensions: [".js", ".json", ".jsx", ".css"],
  },
};
