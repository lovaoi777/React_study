const paths = require('./paths');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const getClientEnvironment = require('./env');
const cssRegex=/\.css$/;
const cssModuleRegex=/\.module\.css$/;
const sassRegex=/\.(scss|sass)$./;
const sassModuleRegex=/\.module\.(scss|sass)$/;

const env = getClientEnvironment(paths.publicUrlOrPath.slice(0,-1));

module.exports={
    mode : 'production',
    entry : paths.ssrIndexJs,
    target: 'node',
    output : { 
        path : paths.ssrBuild,
        filename : 'server.js',
        chunkFilename : 'js/[name].chunk.js',
        publicPath : paths.publicUrlOrPath,
    },
    moduel:{
        rules : [
        {
            oneOf : [
                {
                    test: /\.(js|mjs|jsx|ts|tsx)$/,
                    include:paths.appSrc,
                    loader:require.resolve('babel-loader'),
                    options:{
                        customize : require.resolve(
                            'babel-preset-react-app/webpack-orverrids'
                        ),
                        presets:[
                            [
                                require.resolve('babel-preset-react-app'),
                                {
                                    runtime:'automatic',
                                },
                            ],
                        ],
                        plugin: [
                            [
                                require.resolve('babel-plugin-named-asset-import'),
                                {
                                    loaderMap:{
                                        svg : {
                                            ReactComponent : 
                                            '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                                        },
                                    },
                                },
                            ],
                        ],
                        cacheDirectory:true,
                        cacheCompression:false,
                        compact : false,
                    },
                },
                //CSS를 위한 처리
                {
                    test:cssRegex,
                    exclude:cssModuleRegex,
                    loader:require.resolve('css-loader'),
                    options:{
                        importLoaders : 1,
                        modules:{
                            exportOnlyLocals : true,
                        },
                    },
                },
                {
                    test : cssModuleRegex,
                    loader: require.resolve('css-loader'),
                    options: { 
                        importLoaders : 1,
                        modules:{
                            exportOnlyLocals : true,
                            getLocalIdent : getCSSModuleLocalIdent,
                        },
                    },
                },
                {
                    test: sassRegex,
                    exclude: sassModuleRegex,
                    use: [
                        {
                            loader: require.resolve('css-loader'),
                            options: { 
                                importLoaders: 2,
                                module:{
                                    exportOnlyLocals : true,
                                },
                            },
                        },
                        require.resolve('sass-loader'),
                    ],
                },
                {
                    test:sassRegex,
                    exclude:sassModuleRegex,
                    use:[
                        {
                            loader:require.resolve('css-loader'),
                            options:{
                                importLoaders : 3,
                                modules: {
                                    exportOnlyLocals : true,
                                    getLocalIdent:getCSSModuleLocalIdent,
                                },
                            },
                        },
                        require.resolve('sass-loader'),
                    ],
                },
                {
                    test:[/\.bmp$/,/\.gif$/,/\.jpe?g$/,/\.png$/],
                    options:{
                        emitFile:false,
                        limit: 50000,
                        name:'static/media/[name].[hash:8].[ext]',
                    },
                },
                {
                    loader:require.resolve('file-loader'),
                    exclude: [/\.(js|mjs|jsx|ts|tsx)$/,/\.html$/, /\.json$/],
                    options:{
                        emitFile:false,
                        name:'static/media/[name].[hash:8].[ext]',
                    },
                },
            ],
        },
        ],
    },
    resolve:{
        module:['node_modules']
    },
    externals: [nodeExternals({
        allowlist : [/@babel/],
    })]
};