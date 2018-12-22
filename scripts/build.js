const rollupLwcCompilerPlugin = require('@lwc/rollup-plugin');
const path = require('path');
const rollup = require('rollup');

const baseInputConfig = {
    external(id) {
        return id === 'lwc';
    },
    plugins: [
        rollupLwcCompilerPlugin({
            resolveFromPackages: false
        })
    ]
};

rollup.rollup({
    ...baseInputConfig,
    input: path.resolve('./src/index.js'),
})
.then((bundle) => {
    return bundle.write({
        globals: {
            lwc: 'Engine',
        },
        format: 'iife',
        name: 'ffmpeg',
        file: path.resolve('./public/ffmpeg.js')
    });
})
