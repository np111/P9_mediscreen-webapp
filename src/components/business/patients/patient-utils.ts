import {ApiPatient} from '../../../utils/api/patients-types';
import {formatNA} from '../../../utils/format';
import {Translate} from '../../ui/i18n/types';

export function getPatientName(t: Translate, patient: ApiPatient) {
    return formatNA(t, patient.firstName) + ' ' + formatNA(t, patient.lastName);
}
