const path = require("path");

// This is our JavaScript rule that specifies what to do with .js files
const javascript = {
  test: /\.(js)$/, // see how we match anything that ends in `.js`? Cool
  use: [
    {
      loader: "babel-loader",
      options: { presets: ["@babel/preset-env"] }, // this is one way of passing options
    },
  ],
};

module.exports = {
  mode: "development",
  entry: "./public/javascripts/app.js",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "public", "dist"),
    filename: "App.bundle.js",
  },
  module: {
    rules: [javascript],
  },
};
