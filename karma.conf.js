var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: [process.env.CONTINUOUS_INTEGRATION ? 'Firefox' : 'Chrome'],
    frameworks: ['mocha'],
    files: [
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          // TODO: fix sourcemaps
          // see: https://github.com/deepsweet/isparta-loader/issues/1
          {
            test: /\.js$|.jsx$/,
            loader: 'babel?experimental',
            exclude: /node_modules/
          },
          {
            test: /\.js$|.jsx$/,
            loader: 'isparta?{babel: {stage: 1}}',
            exclude: /node_modules|test/
          },
          {
            test: /\.scss$/,
            loader: 'style!css!sass'
          },
          {
            test: /\.(jpe?g|png|gif|svg|woff|eot|ttf)$/,
            loader: 'file?name=[sha512:hash:base64:7].[ext]'
          },
          {
            test: /\.json$/, loader: 'json'
          }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            BROWSER: JSON.stringify(true),
            NODE_ENV: JSON.stringify('test')
          }
        })
      ],
      resolve: {
        extensions: ['', '.js', '.json', '.jsx'],
        modulesDirectories: ['node_modules', 'app']
      }
    },
    webpackServer: {
      noInfo: true
    }
  });
};
