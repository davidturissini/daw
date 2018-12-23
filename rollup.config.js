const rollupLwcCompilerPlugin = require('@lwc/rollup-plugin');
const rollupPluginCommonJS = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const rollupPluginAlias = require('rollup-plugin-alias');
const rollupPluginBuiltIns = require('rollup-plugin-node-builtins');
const path = require('path');

const baseInputConfig = {
    plugins: [
        rollupPluginBuiltIns({
            crypto: true
        }),
        nodeResolve({
            jsnext: true,
            main: true
        }),
        rollupPluginAlias({
            'lwc': require.resolve('@lwc/engine'),
            'wire-service': require.resolve('@lwc/wire-service'),
        }),
        rollupLwcCompilerPlugin({
            resolveFromPackages: false
        }),
        rollupPluginCommonJS({}),
    ]
};

export default [{
    ...baseInputConfig,
    input: path.resolve('./src/index.js'),
    output: {
        format: 'iife',
        name: 'ffmpeg',
        file: path.resolve('./public/ffmpeg.js')
    }
}, {
    input: path.resolve('./src/worker/ffmpeg-worker.js'),
    output: {
        format: 'iife',
        name: 'ffmpegworker',
        file: path.resolve('./public/ffmpeg-worker.js')
    }
}]
