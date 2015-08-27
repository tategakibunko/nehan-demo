var webpack = require("webpack");

module.exports = {
  entry:{
    "main":"./js/index.js"
  },
  output:{
    path:[__dirname, "dist"].join("/"),
    filename:"[name].js"
  }
};
