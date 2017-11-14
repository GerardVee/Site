var path = require('path');
var webpack = require('webpack');

const appSrc = path.join(path.join(__dirname, '..'), '/src/');
const appBuild = path.join(path.join(__dirname, '..'), '/build');

module.exports =
{
    devtool: 'eval',
    entry:
    {
        'main':
        [
            require.resolve('react-hot-loader/patch'),
            require.resolve('webpack-hot-middleware/client') + '?timeout=20000',
            require.resolve('webpack/hot/dev-server'),
            require.resolve('./polyfills'),
            path.resolve(path.join(appSrc, 'client.js'))
        ]
    },  
    output:
    {
        publicPath : '/static/',
        path: path.join(path.join(__dirname, '..'), '/public/js'),
        filename : '[name].min.js',
        hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
        hotUpdateMainFilename: 'hot/[hash].hot-update.json',
        devtoolModuleFilenameTemplate: function(info)
        {
            return "file:///" + encodeURI(info.absoluteResourcePath);
        }
    },
    module:
    {
        loaders:
        [
            {
                test: /\.js$/,
                include: appSrc,
                loader: 'babel-loader',
                query: require('./babel.dev')
            }
        ]
    },
    plugins:
    [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin(
        {
            'process.env':
            {
                NODE_ENV: JSON.stringify('dev'),
                agent: JSON.stringify('BROWSER'),
                PORT: JSON.stringify('')
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
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