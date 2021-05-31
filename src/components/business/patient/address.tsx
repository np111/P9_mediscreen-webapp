import {formatNA} from '../../../utils/format';
import {useTranslation} from '../../ui/i18n/use-translation';

export interface AddressProps {
    value?: string;
}

export function Address({value}: AddressProps) {
    const {t} = useTranslation();

    return formatNA(t, value);
}
