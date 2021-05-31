import {PhoneNumberFormat, PhoneNumberUtil} from 'google-libphonenumber';
import {useMemo} from 'react';
import {formatNA} from '../../../utils/format';
import {useTranslation} from '../../ui/i18n/use-translation';

export interface PhoneProps {
    value?: string;
}

export function Phone({value}: PhoneProps) {
    const {t} = useTranslation();

    const formattedPhone = useMemo(() => {
        if (!value) {
            return undefined;
        }
        try {
            const phoneParts = value.split(' ', 2);
            const phoneUtil = PhoneNumberUtil.getInstance();
            return phoneUtil.format(
                phoneUtil.parse(phoneParts[1], phoneUtil.getRegionCodeForCountryCode(parseInt(phoneParts[0]))),
                PhoneNumberFormat.INTERNATIONAL);
        } catch (e) {
            return value;
        }
    }, [value]);
    return formatNA(t, formattedPhone);
}
