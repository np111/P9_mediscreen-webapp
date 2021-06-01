import {Divider, Space as AntSpace, SpaceProps as AntSpaceProps} from 'antd';
import React, {ForwardedRef, forwardRef, HTMLProps} from 'react';

export interface SpaceProps extends AntSpaceProps {
    divider?: boolean;
}

export function Space({divider, split, ...spaceProps}: SpaceProps) {
    if (split === undefined && divider) {
        split = <Divider type='vertical'/>;
    }
    return <AntSpace {...spaceProps} split={split}/>;
}

export const HorizontalSpace = forwardRef(function HorizontalSpace(props: HTMLProps<HTMLDivElement>, ref: ForwardedRef<HTMLDivElement>) {
    return (
        <div
            {...props}
            ref={ref}
            style={{display: 'flex', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap', ...props.style}}
        />
    );
});
