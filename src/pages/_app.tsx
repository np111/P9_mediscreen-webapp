import {AppProps} from 'next/app';
import React from 'react';
import '../assets/styles/app.global.scss';

export default function MyApp({Component, pageProps}: AppProps) {
    return <Component {...pageProps} />;
}
