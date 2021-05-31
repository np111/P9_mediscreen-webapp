import {formatNA} from '../../../utils/format';
import {useTranslation} from '../../ui/i18n/use-translation';

export interface PostalCodeProps {
    value?: string;
}

export function PostalCode({value}: PostalCodeProps) {
    const {t} = useTranslation();

    return formatNA(t, value);
}
