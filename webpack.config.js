var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var precss = require('precss')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CompressionPlugin = require('compression-webpack-plugin')
var HappyPack = require('happypack')

const _isDev = (process.env.PORT === 3001 || typeof(process.env.PORT) === 'undefined') ? true : false

const plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
        'process.env': defineEnvironment(_isDev)
    })
]

if(!_isDev) {
    plugins.push(new ExtractTextPlugin('bundle.css'))
    plugins.push(
        new CompressionPlugin({
		          asset: "[path].gz[query]",
		          algorithm: "gzip",
		          test: /\.(js|html)$/,
		          threshold: 10240,
		          minRatio: 0.8
	        })
    )
    plugins.push(
        new HappyPack({
            id: 'js',
            loaders: ['babel-loader?cacheDirectory'],
            threads: 4
        })
    )
}

const entries = (_isDev) ? [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    './src/index'
] : [
    'babel-polyfill',
    './src/index'
]

module.exports = {
  devtool: (_isDev) ? 'cheap-module-eval-source-map' : null,
  entry: entries,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: plugins,
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint'],
        include: [
          path.resolve(__dirname, "src"),
        ],
      }
    ],
    loaders: [
      {
        loaders: (_isDev) ? ['react-hot', 'babel-loader'] : ['happypack/loader?id=js'],
        include: [
          path.resolve(__dirname, "src"),
        ],
        test: /\.js$/,
        plugins: ['transform-runtime'],
      },
      {
        test:   /\.css$/,
        loader: (_isDev) ? "style-loader!css-loader!postcss-loader" : ExtractTextPlugin.extract('style-loader', 'css-loader'),
      },
      {
        test:   /\.(png|jpg|svg)$/,
        loader: "file-loader"
      },
      {
          test: /\.json$/,
          loader: "json-loader"
      }

    ]
  },
  postcss: function () {
    return [autoprefixer, precss];
  }
}

function defineEnvironment(devMode) {
    let env = {
        NODE_ENV: (devMode) ? 'development' : 'production',
        PORT: (devMode) ? '3001' : process.env.PORT,
        BASE_URL : (devMode) ? 'http://api.takebus.ru' : 'http://api.takebus.ru',
        ROLLBARTOKEN : '5c30f60cdf824c02a89a492fb1a32062',
        GET_STOP : '/api/v1/stop/get/',
        STOP_SEARCH: '/api/v1/stop/search/',
        ROUTE_SEARCHE :  '/api/v1/route/search/',
        UPDATE_ROUTE : '/api/v1/route/update/',
        VERIFY_COUPON : '/api/coupon/verify/',
        GET_COUPON : '/api/coupon/get/',
        BOOK : '/api/v1/order/book',
        PAYLERFORM : '/api/v1/order/frame/',
        BUY : '/api/v1/order/buy',
        GET_CURRENT_ACCOUNT : '/api/v1/account/current',
        SIGNIN : '/api/v1/account/signin',
        SIGNOUT : '/api/v1/account/signout',
        DEPARTURE : 'departure',
        ARRIVAL : 'arrival',
        GETPDF : '/api/v1/order/pdf64/'
    }

    let def = {}
    for(let key in env) {
        def[key] = JSON.stringify(env[key])
    }

    return def
}
