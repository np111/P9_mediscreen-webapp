import {formatNA} from '../../../utils/format';
import {useTranslation} from '../../ui/i18n/use-translation';
import {useCountries} from '../use-countries';

export interface CountryProps {
    value?: string;
}

export function Country({value}: CountryProps) {
    const {t} = useTranslation();
    const {countries} = useCountries();
    const country = (value && countries) ? countries[value] : undefined;

    return formatNA(t, country ? country.name : value);
}
