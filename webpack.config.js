const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devServer: {
        contentBase: path.join(__dirname, '/'),
        compress: true,
        port: 4001,
        stats: 'minimal',
        historyApiFallback: true,
    },
    devtool: 'inline-source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                  outputPath: 'images'
                }
            },
            {
                test: /\.sass|scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { sourceMap: true, importLoaders: 1 }
                    },
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    resolve:{
        extensions: [".js",".jsx",".ts",".tsx"]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: 'app.css'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};
