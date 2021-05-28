import React, {ForwardedRef, forwardRef, HTMLProps} from 'react';
import styles from './container.module.scss';

export const Container = forwardRef(function Container(props: HTMLProps<HTMLDivElement>, ref: ForwardedRef<HTMLDivElement>) {
    return <div {...props} ref={ref} className={styles.container + (props.className ? ' ' + props.className : '')}/>;
});
