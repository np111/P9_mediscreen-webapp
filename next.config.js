const withNextTranslate = require('next-translate');
const withAntdLess = require('next-plugin-antd-less');

const basePath = process.env.BASE_PATH || '';
const assetPrefix = process.env.ASSET_PREFIX || '';

module.exports = withAntdLess(withNextTranslate({
    basePath,
    assetPrefix,

    modifyVars: require('./src/assets/styles/antd.theme'),
    lessVarsFilePathAppendToEndOfContent: false,
    cssLoaderOptions: {
        esModule: false,
        sourceMap: false,
    },

    webpack(config, options) {
        // Handle assets files (images, fonts, ...)
        const fileLoaderOutputPath = 'static/media/';
        config.module.rules.push({
            test: /\.(ico|gif|png|jpg|jpeg|svg|webp|webm|mp4|ttf|woff|woff2|eot)$/,
            issuer: {
                // Excludes files managed by next.js
                and: [/\.\w+(?<!(css|sass|scss|less))$/i],
            },
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        publicPath: (url) => (assetPrefix || basePath) + '/_next/' + fileLoaderOutputPath + url,
                        outputPath: fileLoaderOutputPath,
                        name: !options.dev ? '[hash].[ext]' : '[path][name].[ext]',
                        emitFile: true,
                        esModule: false,
                    },
                },
            ],
        });

        return config;
    },
    future: {
        webpack5: true,
    },

    publicRuntimeConfig: {
        servicesBaseUrl: {
            patients: process.env.PATIENTS_SERVICE_BASE_URL || 'http://localhost:8081/',
            notes: process.env.NOTES_SERVICE_BASE_URL || 'http://localhost:8082/',
            assessment: process.env.ASSESSMENT_SERVICE_BASE_URL || 'http://localhost:8083/',
        },
    },
}));
