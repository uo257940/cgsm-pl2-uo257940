module.exports = {
    mode: "development",
    entry: {
        "prac6-4": './src/prac6-4.js'
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