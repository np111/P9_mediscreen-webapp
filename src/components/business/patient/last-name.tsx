import {formatNA} from '../../../utils/format';
import {useTranslation} from '../../ui/i18n/use-translation';

export interface LastNameProps {
    value?: string;
}

export function LastName({value}: LastNameProps) {
    const {t} = useTranslation();

    return formatNA(t, value);
}
