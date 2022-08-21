const mix = require('laravel-mix');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .vue()
    .js('resources/js/webInit.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .copyDirectory('resources/sass/fonts', 'public/css/fonts')
    .options({
        legacyNodePolyfills: true
    })
    .webpackConfig({
        plugins: [
            new NodePolyfillPlugin(),
        ],
    
        resolve: {
            fallback: {
                fs: require.resolve('browserify-fs'),
            }
        }
    });
