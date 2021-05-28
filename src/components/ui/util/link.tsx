import NextLink, {LinkProps as NextLinkProps} from 'next/link';
import React, {PropsWithChildren} from 'react';

export type LinkProps = NextLinkProps;

export function Link({passHref, children, ...props}: PropsWithChildren<LinkProps>) {
    if (passHref === undefined && isButtonOrAnchor(children)) {
        passHref = true;
    }
    return <NextLink {...props} passHref={passHref}>{children}</NextLink>;
}

function isButtonOrAnchor(children: any) {
    return !!(children && children.type && (children.type.__ANT_BUTTON || children.type.__IS_ANCHOR));
}
