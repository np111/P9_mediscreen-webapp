import {formatNA} from '../../../utils/format';
import {useTranslation} from '../../ui/i18n/use-translation';

export interface StateProps {
    value?: string;
}

export function State({value}: StateProps) {
    const {t} = useTranslation();

    return formatNA(t, value);
}
