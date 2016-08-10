var webpack = require('webpack');


module.exports = {
    entry  : './src/index.js',
    output : {
        // export itself to a global var
        path       : __dirname,
        publicPath : '/',
        filename   : 'bundle.js'
    },

    module : {
        loaders : [
            {
                test    : /\.js$/,
                exclude : /(node_modules)/,
                loader  : 'babel'
            },

	    { test : /\.css$/, loader : "style-loader!css-loader" }
        ]
    }
};

