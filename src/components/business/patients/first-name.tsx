import {formatNA} from '../../../utils/format';
import {useTranslation} from '../../ui/i18n/use-translation';

export interface FirstNameProps {
    value?: string;
}

export function FirstName({value}: FirstNameProps) {
    const {t} = useTranslation();

    return formatNA(t, value);
}
