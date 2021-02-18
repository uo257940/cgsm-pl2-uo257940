module.exports = {
    mode: "development",
    entry: {
        "prac4-4": './src/prac4-4.js'
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