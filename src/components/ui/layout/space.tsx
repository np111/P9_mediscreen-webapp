import {Space as AntSpace, SpaceProps as AntSpaceProps} from 'antd';
import React, {ForwardedRef, forwardRef, HTMLProps} from 'react';

export type SpaceProps = AntSpaceProps;
export const Space = AntSpace;

export const HorizontalSpace = forwardRef(function HorizontalSpace(props: HTMLProps<HTMLDivElement>, ref: ForwardedRef<HTMLDivElement>) {
    return (
        <div
            {...props}
            ref={ref}
            style={{display: 'flex', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap', ...props.style}}
        />
    );
});
