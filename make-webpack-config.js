var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

function extsToRegExp(exts) {
  return new RegExp("\\.(" + exts.map(function(ext) {
    return ext.replace(/\./g, "\\.");
  }).join("|") + ")(\\?.*)?$");
}

function loadersByExtension(obj) {
  var loaders = [];
  Object.keys(obj).forEach(function(key) {
    var exts = key.split("|");
    var value = obj[key];
    var entry = {
      extensions: exts,
      test: extsToRegExp(exts)
    };
    if(Array.isArray(value)) {
      entry.loaders = value;
    } else if(typeof value === "string") {
      entry.loader = value;
    } else {
      Object.keys(value).forEach(function(valueKey) {
        entry[valueKey] = value[valueKey];
      });
    }
    loaders.push(entry);
  });
  return loaders;
};

module.exports = function(options) {
  var entry = {
    bundle: "./web/static/js/app.js"
  };

  var output = {
    filename: "bundle.js"
  }

  var loaders = {
    "jsx": options.hotComponents ? ["react-hot-loader", "babel-loader?stage=0"] : "babel-loader?stage=0",
    "js": {
      loader: "babel-loader?stage=0",
      include: path.join(__dirname, "web")
    },
    "json": "json-loader",
    "coffee": "coffee-redux-loader",
    "json5": "json5-loader",
    "txt": "raw-loader",
    "png|jpg|jpeg|gif|svg": "url-loader?limit=10000",
    "woff|woff2": "url-loader?limit=100000",
    "ttf|eot": "file-loader",
    "wav|mp3": "file-loader",
    "html": "html-loader",
    "md|markdown": ["html-loader", "markdown-loader"]
  };
  var cssLoader = options.minimize ? "css-loader?module" : "css-loader?module&localIdentName=[path][name]---[local]---[hash:base64:5]";
  var stylesheetLoaders = {
    "css": cssLoader,
    "less": [cssLoader, "less-loader"],
    "styl": [cssLoader, "stylus-loader"],
    "scss|sass": [cssLoader, "sass-loader"]
  };
  var additionalLoaders = [
    // { test: /some-reg-exp$/, loader: "any-loader" }
  ];
  var alias = {

  };
  var aliasLoader = {

  };
  var externals = [

  ];
  var modulesDirectories = ["web_modules", "node_modules"];
  var extensions = ["", ".web.js", ".js", ".jsx"];
  var root = path.join(__dirname, "web");
  var publicPath = "/_assets/";
  var output = {
    path: "./priv/static/js",
    publicPath: publicPath,
    filename: "[name].js" + (options.longTermCaching && !options.prerender ? "?[chunkhash]" : ""),
    chunkFilename: "[name].js" + (options.longTermCaching && !options.prerender ? "?[chunkhash]" : ""),
    sourceMapFilename: "debugging/[file].map",
    libraryTarget: options.prerender ? "commonjs2" : undefined,
    pathinfo: options.debug || options.prerender
  };
  var excludeFromStats = [
    /node_modules[\\\/]react(-router)?[\\\/]/,
    /node_modules[\\\/]items-store[\\\/]/
  ];
  var plugins = [
    new webpack.PrefetchPlugin("react"),
    new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment")
  ];
  if(options.prerender) {
    aliasLoader["react-proxy$"] = "react-proxy/unavailable";
    aliasLoader["react-proxy-loader$"] = "react-proxy-loader/unavailable";
    externals.push(
      /^react(\/.*)?$/
    );
    plugins.push(new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }));
  }
  if(options.commonsChunk) {
    plugins.push(new webpack.optimize.CommonsChunkPlugin("commons", "commons.js" + (options.longTermCaching && !options.prerender ? "?[chunkhash]" : "")));
  }

  Object.keys(stylesheetLoaders).forEach(function(ext) {
    var stylesheetLoader = stylesheetLoaders[ext];
    if(Array.isArray(stylesheetLoader)) stylesheetLoader = stylesheetLoader.join("!");
    if(options.prerender) {
      stylesheetLoaders[ext] = stylesheetLoader.replace(/^css-loader/, "css-loader/locals");
    } else if(options.separateStylesheet) {
      stylesheetLoaders[ext] = ExtractTextPlugin.extract("style-loader", stylesheetLoader);
    } else {
      stylesheetLoaders[ext] = "style-loader!" + stylesheetLoader;
    }
  });
  if(options.separateStylesheet && !options.prerender) {
    plugins.push(new ExtractTextPlugin("[name].css" + (options.longTermCaching ? "?[contenthash]" : "")));
  }
  if(options.minimize && !options.prerender) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      new webpack.optimize.DedupePlugin()
    );
  }
  if(options.minimize) {
    plugins.push(
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        }
      }),
      new webpack.NoErrorsPlugin()
    );
  }

  return {
    entry: entry,
    output: output,
    target: options.prerender ? "node" : "web",
    module: {
      loaders: loadersByExtension(loaders).concat(loadersByExtension(stylesheetLoaders)).concat(additionalLoaders)
    },
    devtool: options.devtool,
    debug: options.debug,
    resolveLoader: {
      root: path.join(__dirname, "node_modules"),
      alias: aliasLoader
    },
    externals: externals,
    resolve: {
      root: root,
      modulesDirectories: modulesDirectories,
      extensions: extensions,
      alias: alias
    },
    plugins: plugins,
    devServer: {
      stats: {
        cached: false,
        exclude: excludeFromStats
      }
    }
  };
};
