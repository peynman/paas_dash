const path = require('path')
const glob = require('glob')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const {
    BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer')
const {
    VueLoaderPlugin
} = require('vue-loader')
const webpack = require('webpack')

module.exports = {
    mode: 'production',
    entry: {
        routes: {
            import: './src/routes.js',
            filename: 'routes.js',
        },
        theme: {
            import: './src/theme.js',
            filename: 'theme.js',
        },
        schemas: {
            import: './src/components/auto-schemas.js',
            filename: 'schemas.js',
        },
        // locales
        ...glob.sync('./src/lang/*.js').reduce((entries, file) => {
            const p = path.parse(file)
            entries[`locale_${p.name}`] = {
                import: file,
                filename: `locale/${p.name.toLocaleLowerCase()}.js`,
            }
            return entries
        }, {}),
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].js',
        library: '@peynman/press-vue-admin',
        libraryTarget: 'umd',
    },
    externals: [
        /^vue.*/,
        /^vuex.*/,
        /^@peynman.*/,
        /^.*\.(vue)$/
    ],
    resolve: {
        symlinks: false,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        // new webpack.IgnorePlugin({
        //     checkResource(resource, context) {
        //         console.log(resource, context)
        //         return resource.includes('RemotePage')
        //     }
        // }),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new BundleAnalyzerPlugin({
            openAnalyzer: false,
            reportFilename: 'analyzer.html',
            analyzerMode: 'static',
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: './package.json',
                to: './package.json'
            },{
                from: './src/templates/**',
                to({ context, absoluteFilename }) {
                    const relPath = path.relative(context, absoluteFilename).substring('src/templates'.length)
                    return `templates/${relPath}`;
                },
            }, {
                from: './src/components/**',
                to({ context, absoluteFilename }) {
                    const relPath = path.relative(context, absoluteFilename).substring('src/components'.length)
                    return `components/${relPath}`;
                },
            },{
                from: './src/pages/*.vue',
                to: './pages/[name].vue'
            }]
        }),
    ]
}