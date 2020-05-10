const path = require('path');
const webpack = require('webpack');

module.exports = {
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
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                loader: [
                    "react-hot-loader/webpack",
                    "awesome-typescript-loader"
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
};