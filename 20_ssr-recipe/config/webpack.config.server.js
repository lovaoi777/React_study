const paths = require('./paths')
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const getClientEnvironment = require('./env');
const env = getClientEnvironment(paths.publicUrlOrPath.slice(0,-1));
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;



module.exports = { 
    module : 'production', //프로덕션 모드로 설정하여 최적화 옵션들을 활성화
    entry : paths.ssrIndexJs, // 엔트리 경로
    target : 'node', //node 환경에서 실행될 것이라는 점을 명시
    output : {
        path : paths.ssrBuild, //빌드 경로
        filename : 'server.js' , //파일 이름
        chunkFilename : 'js/[name].chunk.js', //청크 파일 이름
        publicPath: paths.publicUrlOrPath, //정적 파일이 제공될 경로
    },
    module: { 
        reules :[
            {
                oneOf:[ // 인자로 들어가는 배열에 포함된 값 중에서 하나를 만족해야 한다는 의미
                    //자바스크립트를 위한 처리
                    //기존 webpack.config.js를 참고하여 작성
                    {
                    test: /\.(js|mjs|jsx|ts|tsx)$/,
                    include: paths.appSrc,
                    loader:require.resolve('babel-loader'),
                    option: {
                        customize : require.resolve(
                            'babel-preset-react-app/webpack-overrides'
                        ),
                        presets:[
                            [
                                require.resolve('babel-preset-react-app'),
                                {
                                    runtime:'automatic',
                                },
                            ],
                        ],
                        plugins: [
                            [
                                require.resolve('babel-plugin-named-asset-import'),
                                {
                                    loaderMap:{
                                        svg : {
                                            ReactComponent:
                                            '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                                        },
                                    },
                                },
                            ],
                        ],
                        cacheDirectory : true,
                        cacheCompression : false,
                        compact : false,
                    },
                },
                // CSS를 위한 처리
                {
                    test : cssRegex,
                    exclude : cssModuleRegex,
                    //exportOnlyLocals : true 옵션을 설정해야 실제 css 파일을 생성하지 않는다.
                    loader: require.resolve('css-loader'),
                    options : {
                        importLoaders : 1, 
                        modules: { 
                            exportOnlyLocals : true
                        },
                    },
                },
                //CSS Module를 위한 처리
                {
                    test:cssModuleRegex,
                    loader:require.resolve('css-loader'),
                    options:{
                        importLoaders : 1,
                        modules : { 
                            exportOnlyLocals : true,
                            getLocalIdnet : getCSSModuleLocalIdent,
                        },
                    },
                },
                //Sass를 위한 처리
                {
                    test:sassRegex,
                    exclude:sassModuleRegex,
                    use: [
                        {
                            loader:require.resolve('css-loader'),
                            options:{
                                importLoaders:3,
                                modules : {
                                    exportOnlyLocals : true,
                                },
                            },
                        },
                        require.resolve('sass-loader'),
                    ],
                },
                // Sass + CSS Module를 위한 처리
                {
                    test:sassRegex,
                    exclude:sassModuleRegex,
                    use: [
                        {
                            loader:require.resolve('css-loader'),
                            options:{
                                importLoaders: 3,
                                modules:{
                                    exportOnlyLocals: true,
                                    getLocalIdnet : getCSSModuleLocalIdent,
                                },
                            },
                        },
                        require.resolve('sass-loader'),
                    ],
                },
                //url-loader를 위한 설정
                {
                    test:[/\.bmp$/, /\.git$/,/\.jpe??g$/,/\.png$/],
                    loader : require.resolve('url-loader'),
                    options: { 
                        emitFile: false, // 파일을 따로 저장하지 않는 옵션
                        limit : 10000 , //원래는 9.76KB가 넘어가면 파일로 저장하는데 
                        //emitFile 값이 false 일땐 경로만 준비하고 파일은 저장하지 않습니다.
                        name : 'static/media/[name].[hash:8].[ext]',
                    },
                },
                //위에서 설정된 확장자를 제외한 파일들은
                // file-loader를 사용합니다.
                {
                    loader:require.resolve('file-loader'),
                    exclude:[/\.(js|mjs|jsx|ts|tsx)$/,/\.html$/,/\.json$/],
                    options: {
                        emitFile:false , //파일을 따로 저장하지 않는 주석
                        name : 'static/media/[name].[hash:8].[ext]',
                    },
                },
                ],
            },
        ],
    },
    resolve: {
        modules: ['node_modules']
    },
    externals : [nodeExternals({
        allowlist: [/@babel/]
    })]
};
    