module.exports = {
    mode: "development",
    entry: {
        "prac5-2": './src/prac5-2.js'
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