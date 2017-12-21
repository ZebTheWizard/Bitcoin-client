let mix = require('laravel-mix')

mix.webpackConfig({
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitError: true,
          emitWarning: true
        }
      }
    ]
  }
})

mix.js('src/app.js', 'dist/js')
  .sass('src/styles/app.scss', 'dist/css')
