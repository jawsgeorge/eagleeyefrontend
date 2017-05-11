

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

var reactDomLibPath = path.join(__dirname, "./node_modules/react-dom/lib");
var alias = {};
["EventPluginHub", "EventConstants", "EventPluginUtils", "EventPropagators",
 "SyntheticUIEvent", "CSSPropertyOperations", "ViewportMetrics"].forEach(function(filename){
    alias["react/lib/"+filename] = path.join(__dirname, "./node_modules/react-dom/lib", filename);
});

var config = {

   context:path.join(__dirname,"src"),
   entry: './main.js',

   output: {
      path: __dirname +'/src',
      filename: 'bundle.js',
   },

   devServer: {
      inline: true,
       //host : '10.200.204.157',
      port: 7075
   },
   resolve: {
    extensions: ['', '.scss', '.css', '.js', '.json'],
resolve: {alias: alias},
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules')
    ]
  },
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',


            query: {
               presets: ['es2015', 'react','stage-0'],
              //  plugins:['react-html-attrs','transform-class-properties','transform-decorators-legacy']
            }
         },
         {
        test: /(\.scss|\.css)$/,

      }
    ]
   },
   postcss: [autoprefixer],
  sassLoader: {
    data: '@import "styles/_config.scss";',
    includePaths: [path.resolve(__dirname, './src')]
  },
  plugins: [
     
     new webpack.optimize.OccurenceOrderPlugin(),
     new webpack.optimize.CommonsChunkPlugin({
       name: 'vendor',
       filename: 'vendor.bundle.js',
       minChunks: Infinity
     }),
     new webpack.HotModuleReplacementPlugin(),
     new webpack.NoErrorsPlugin(),
     new webpack.DefinePlugin({
       'process.env.NODE_ENV': JSON.stringify('development')
     })
   ]
}

module.exports = config;
