import {Translate} from '../components/ui/i18n/types';

export function formatNA(t: Translate, value: any) {
    return value === undefined || value === null ? t('common:notAvailable') : value.toString();
}
