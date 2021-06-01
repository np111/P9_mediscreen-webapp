import moment, {Moment} from 'moment';
import {formatNA} from '../../../utils/format';
import {useTranslation} from '../../ui/i18n/use-translation';

export interface BirthdateProps {
    value?: string | Moment;
}

export function Birthdate({value}: BirthdateProps) {
    const {t} = useTranslation();

    if (moment.isMoment(value)) {
        value = value.format('YYYY-MM-DD');
    }
    return formatNA(t, value);
}
