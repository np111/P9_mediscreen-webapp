import {Table as AntTable, TableProps as AntTableProps} from 'antd';
import React from 'react';

export type TableProps<RecordType> = AntTableProps<RecordType>;

// eslint-disable-next-line
export function Table<RecordType extends object = any>(props: TableProps<RecordType>) {
    return (
        <AntTable
            {...props}
            scroll={props.scroll === undefined ? {x: true} : props.scroll}
        />
    );
}
