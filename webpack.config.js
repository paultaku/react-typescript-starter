const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

module.exports = {
    mode: 'development',
    entry: [
        "react-hot-loader/patch",
        __dirname + "/src/index.tsx"
    ],
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist",
        publicPath: '/dist/'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    
    devServer: {
        contentBase: path.join(__dirname, ""),
        watchContentBase: true,
        compress: true,
        port: process.env.PORT || 3000,
        hot: true,
        inline: true,
        public: process.env.IP || "localhost"
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json", ".css", ".scss", ".sass"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                loader: 'tslint-loader',
                exclude: /node_modules/,
                enforce: 'pre',
            },
            {
                test: /\.tsx?$/,
                loader: [
                    "awesome-typescript-loader"
                ]
            },

            {
                test: cssModuleRegex,
                exclude: cssRegex,
                use: [
                    // to inject the result into the DOM as a style block
                    { loader: "style-loader" },
                    // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
                    { loader: "css-loader", options: { modules: true } },
                ]
            },

            {
                test: sassModuleRegex,
                use: [
                    // to inject the result into the DOM as a style block
                    { loader: "style-loader" },
                    // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
                    { loader: "css-loader", options: {
                        modules: true,
                        importLoaders: 2,
                    } },
                    // to convert SASS to CSS
                    { loader: "sass-loader" },
                ]
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: ["source-map-loader"]
            },

            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192,
                    },
                  },
                ],
              },
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
};