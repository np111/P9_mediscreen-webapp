import React, {useMemo} from 'react';
import {Skeleton} from '../skeleton';
import {Table, TableProps} from './index';
import style from './skeleton-table.module.scss';

export interface SkeletonTableProps<RecordType> extends TableProps<RecordType> {
    skeletonRowCount?: number;
    skeletonActive?: boolean;
}

// eslint-disable-next-line
export function SkeletonTable<RecordType extends object = any>({skeletonRowCount = 10, skeletonActive = true, ...tableProps}: SkeletonTableProps<RecordType>) {
    const skeletonProps = useMemo((): TableProps<RecordType> => (tableProps.dataSource ? tableProps : {
        ...tableProps,
        rowKey: 'key',
        dataSource: [...Array(skeletonRowCount)].map((ignored, index) => ({key: `row${index}`})),
        pagination: false,
        columns: !tableProps.columns ? undefined : tableProps.columns.map((column, columnIndex) => ({
            ...column,
            render: function RenderPlaceholder(a: undefined, b: undefined, rowIndex: number) {
                const widthIndex = rowIndex + columnIndex;
                return (
                    <Skeleton
                        title={{
                            width: SKELETON_WIDTHS[widthIndex % SKELETON_WIDTHS.length],
                            className: style.title,
                        }}
                        paragraph={false}
                        active={skeletonActive}
                    />
                );
            },
        })),
    } as any), [skeletonRowCount, skeletonActive, tableProps]);
    return <Table {...skeletonProps}/>;
}

const SKELETON_WIDTHS = ['85%', '60%', '98%', '79%', '76%', '83%', '62%', '95%', '81%', '73%'];
