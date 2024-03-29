const lwcLoaderPath = require.resolve('./lwc-loader.js');
const path = require('path');
const fs = require('fs');

const lwcNamespace = 'ffmpeg';

const lwcAliases = fs.readdirSync('./src/ffmpeg').reduce((seed, dirName) => {
    seed[`${lwcNamespace}/${dirName}`] = path.resolve('./src/ffmpeg', dirName, `${dirName}.ts`);
    return seed;
}, {});

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: __dirname + "/public",
        filename: "ffmpeg.js",
        publicPath: '/',
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".js", ".css", ".html"],
        alias: {
            event: path.resolve('./src/event'),
            util: path.resolve('./src/util'),
            store: path.resolve('./src/store'),
            lwc: '@lwc/engine',
            'wire-service': '@lwc/wire-service',
            ...lwcAliases,
            cmp: path.resolve('./src/ffmpeg'),
            notes: path.resolve('./src/notes'),
            keyboard: path.resolve('./src/keyboard'),
            markers: path.resolve('./src/markers'),
            units: path.resolve('./src/units'),
            audio: path.resolve('./src/audio'),
        }
    },
    module: {
        rules: [
            {
                test: /ffmpeg(.)+\.(css|html)$/,
                loader: lwcLoaderPath,
                options: {
                    namespace: lwcNamespace,
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    plugins: [
                        '@babel/plugin-proposal-class-properties'
                    ]
                }
            },
            {
                test: /\.(tsx?)$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-typescript'],
                    plugins: [
                        '@lwc/babel-plugin-component'
                    ]
                }
            },
        ]
    }
}
