import React from 'react';
import useSWR from 'swr';
import {apiClient, UnhandledApiError} from '../../../utils/api/api-client';
import {ApiCheckRiskResult, ApiRiskLevel} from '../../../utils/api/assessment-types';
import {ApiPatient} from '../../../utils/api/patients-types';
import {Trans} from '../../ui/i18n/trans';
import {useTranslation} from '../../ui/i18n/use-translation';
import {Spin} from '../../ui/spin';
import {Tag} from '../../ui/tag';
import {Tooltip} from '../../ui/tooltip';
import {ErrorTag} from '../../ui/util/error';

export interface AssessmentBannerProps {
    patient: ApiPatient;
}

export function AssessmentBanner({patient}: AssessmentBannerProps) {
    const {data: assessment, error} = useSWR<AssessmentResult>(
        ['assessment', '/assessment', patient.id],
        (service, url, patientId) => apiClient
            .fetch<ApiCheckRiskResult>({service, url, body: {patientId}})
            .then((res) => {
                if (res.success) {
                    return res.result;
                }
                if (res.error.code === 'INCOMPLETE_PATIENT') {
                    return {riskLevel: 'UNKNOWN', terms: [], missingField: res.error.metadata.field};
                }
                throw new UnhandledApiError(res.error);
            }));

    if (error) {
        return <ErrorTag error={error}/>;
    }

    return (
        <Trans
            i18nKey='common:assessment.riskLevel'
            components={[!assessment ? <Spin size='small'/> : <RiskLevelTag key={0} {...assessment}/>]}
        />
    );
}

function RiskLevelTag(assessment: AssessmentResult) {
    const {t} = useTranslation();

    let color;
    switch (assessment.riskLevel) {
        case 'NONE':
            color = 'green';
            break;
        case 'BORDERLINE':
            color = 'orange';
            break;
        case 'IN_DANGER':
            color = 'volcano';
            break;
        case 'EARLY_ONSET':
            color = 'red';
            break;
    }

    let help;
    if (assessment.missingField) {
        help = t('common:assessment.missingField', {field: assessment.missingField});
    } else if (assessment.terms && assessment.terms.length) {
        help = t('common:assessment.termsList', {terms: assessment.terms.join(', ')});
    }

    return (
        <Tooltip title={help}>
            <Tag color={color}>{t('common:assessment.riskLevels.' + assessment.riskLevel)}</Tag>
        </Tooltip>
    );
}

interface AssessmentResult {
    riskLevel: ApiRiskLevel | 'UNKNOWN';
    terms: string[];
    missingField?: string;
}
