import classnames from 'classnames';
import React, {PropsWithChildren} from 'react';
import styles from './card.module.scss';

export interface CardProps {
    marginTop?: boolean;
    noPadding?: boolean;
    rounded?: boolean;
}

export function Card({marginTop = true, noPadding, rounded, children}: PropsWithChildren<CardProps>) {
    return (
        <div className={classnames({
            [styles.card]: true,
            [styles.marginTop]: marginTop,
            [styles.noPadding]: noPadding,
            [styles.rounded]: rounded,
        })}>
            {children}
        </div>
    );
}

export interface CardClearPaddingProps {
    horizontal?: boolean;
    top?: boolean;
    bottom?: boolean;
}

export function CardClearPadding({horizontal, top, bottom, children}: PropsWithChildren<CardClearPaddingProps>) {
    return (
        <div className={classnames({
            [styles.clearPaddingHorizontal]: horizontal,
            [styles.clearPaddingTop]: top,
            [styles.clearPaddingBottom]: bottom,
        })}>
            {children}
        </div>
    );
}
