module.exports = {
    locales: ['en'],
    defaultLocale: 'en',
    localeDetection: false,

    loadLocaleFrom: (lang, ns) => import(`./src/assets/locales/${lang}/${ns}.json`).then((m) => m.default),
    logBuild: process.env.NODE_ENV !== 'production',

    pages: {
        '*': ['common'],
    },
};
