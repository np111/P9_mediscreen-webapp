import {ManOutlined, WomanOutlined} from '@ant-design/icons';
import React from 'react';
import {formatNA} from '../../../utils/format';
import {useTranslation} from '../../ui/i18n/use-translation';

export interface GenderProps {
    value?: string;
}

export function Gender({value}: GenderProps) {
    const {t} = useTranslation();

    if (value === 'MALE') {
        return <><ManOutlined/> {t('common:patient.genders.MALE')}</>;
    }
    if (value === 'FEMALE') {
        return <><WomanOutlined/> {t('common:patient.genders.FEMALE')}</>;
    }
    return formatNA(t, value);
}
