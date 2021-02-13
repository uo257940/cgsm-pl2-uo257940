module.exports = {
    mode: "development",
    entry: {
        "prac3-4": './src/prac3-4.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        writeToDisk: true
    },
    module:{
    rules: [
        {
          test: /\.glsl$/,
          use: {
            loader: 'webpack-glsl-loader'
          }
        }
      ]
    }
};