import Head from 'next/head';
import React, {PropsWithChildren} from 'react';
import {useTranslation} from '../ui/i18n/use-translation';
import {TopNavigation, TopNavigationProps} from './top-navigation';

export interface MainLayoutProps {
    currentPage?: string;
    title?: string;
    head?: React.ReactNode;
    topNavigation?: TopNavigationProps;
}

export function MainLayout({currentPage, title, head, topNavigation, children}: PropsWithChildren<MainLayoutProps>) {
    const {t} = useTranslation();

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>

                <title>{title + ' - ' + t('common:siteName')}</title>

                {head}
            </Head>
            <div>
                <TopNavigation currentPage={currentPage} {...topNavigation}/>
                <main>
                    {children}
                </main>
            </div>
        </>
    );
}
