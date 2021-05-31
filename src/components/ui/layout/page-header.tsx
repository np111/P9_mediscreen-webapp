import {PageHeader as AntPageHeader, PageHeaderProps as AntPageHeaderProps} from 'antd';
import React from 'react';
import {AppRouter} from '../../../routes';
import {LinkProps} from '../util/link';

export interface PageHeaderProps extends AntPageHeaderProps {
    back?: LinkProps;
}

export function PageHeader({back, onBack, ...pageHeaderProps}: PageHeaderProps) {
    if (onBack === undefined && back) {
        onBack = () => AppRouter.push(back);
    }
    return <AntPageHeader {...pageHeaderProps} onBack={onBack}/>;
}
