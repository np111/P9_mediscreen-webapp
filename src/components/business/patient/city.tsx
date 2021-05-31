import {formatNA} from '../../../utils/format';
import {useTranslation} from '../../ui/i18n/use-translation';

export interface CityProps {
    value?: string;
}

export function City({value}: CityProps) {
    const {t} = useTranslation();

    return formatNA(t, value);
}
