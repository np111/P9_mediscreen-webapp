import useSWR from 'swr';
import {apiClient} from '../../utils/api/api-client';
import {ApiCountries, ApiCountry} from '../../utils/api/patients-types';
import {useTranslation} from '../ui/i18n/use-translation';

export interface UseCountriesResult {
    countries?: {[code: string]: ApiCountry};
}

export function useCountries(): UseCountriesResult {
    const {lang} = useTranslation();
    const {data} = useSWR<ApiCountries>(
        ['patients', '/country?locale=' + encodeURIComponent(lang)], apiClient.fetchSWR,
        {revalidateOnFocus: false, revalidateOnReconnect: false});
    return {countries: !data ? undefined : data.countries};
}
