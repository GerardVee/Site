var path = require('path');
var webpack = require('webpack');

const appSrc = path.join(path.join(__dirname, '..'), '/dist/');

module.exports =
{
    bail: true,
    devtool: 'source-map',
    entry:
    {
        'main':
        [
            path.resolve(path.join(appSrc, 'client.js'))
        ]
    },  
    output:
    {
        publicPath : '/',
        path: path.join(path.join(__dirname, '..'), '/public/js'),
        filename : '[name].min.js'
    },
    module:
    {
        loaders:
        [
            {
                test: /\.js$/,
                include: appSrc,
                loader: 'babel-loader',
                query: require('./babel.prod')
            }
        ]
    },
    plugins:
    [
        new webpack.DefinePlugin(
        {
            'process.env':
            {
                NODE_ENV: JSON.stringify('production'),
                agent: JSON.stringify('BROWSER'),
                PORT: JSON.stringify('')
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(
        {
            compressor:
            {
                warnings: false
            },
            output:
            {
                comments: false,
                ascii_only: true,
            }
        })
    ],
    resolve:
    {   
        extensions: [ '.js', '.json' ],
        alias:
        {
            'babel-runtime/regenerator': require.resolve('babel-runtime/regenerator')          
        }
    }
};