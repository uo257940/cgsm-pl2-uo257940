module.exports = {
    mode: "development",
    entry: {
        "prac2-7": './src/prac2-7.js'
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