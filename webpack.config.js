/*eslint-env node*/

var path = require( "path" );
var webpack = require( "webpack" );

module.exports = {

    // your entry point - js/index.js or perhaps js/main.js - can be an array of files
    entry: {

        "iaf-1.0.0-client": path.resolve( __dirname, "js/iaf-1.0.0/client.js" ),
        "iaf-1.0.0-server": path.resolve( __dirname, "js/iaf-1.0.0/server.js" ),
        "loader-template": path.resolve( __dirname, "js/loader-template/index.js" )

    },

    // the output folder when forming the packed bundle (also affects the dev server's naming)
    output: {

        path: path.resolve( __dirname, "app/public/js/" ),
        publicPath: "/public/js/",
        filename: "[name].js",
        libraryTarget: "umd"

    },
    module: {

        "loaders": [
            // this loader works for both js and jsx - react and es2015
            {
                test: /.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: [ "es2015", "react" ]
                }
            }

        ]

    },
    plugins: [
/*
        new webpack.optimize.UglifyJsPlugin({
            compress: {
               warnings: false
            }
        })
*/
    ]

};
