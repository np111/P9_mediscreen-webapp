import {AppProps} from 'next/app';
import React from 'react';
import '../assets/styles/app.global.scss';

require('antd/lib/notification/style/index.less'); // FIX: ensures that the CSS for notifications is present on all pages

export default function MyApp({Component, pageProps}: AppProps) {
    return <Component {...pageProps} />;
}
