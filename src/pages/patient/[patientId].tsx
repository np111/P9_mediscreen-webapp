import {GetServerSidePropsContext, GetServerSidePropsResult} from 'next';
import React, {useCallback, useState} from 'react';
import {PatientForm} from '../../components/business/patient/patient-form';
import {MainLayout} from '../../components/layouts/main-layout';
import {useTranslation} from '../../components/ui/i18n/use-translation';
import {Container} from '../../components/ui/layout/container';
import {PageHeader} from '../../components/ui/layout/page-header';
import {routes} from '../../routes';
import {apiClient, UnhandledApiError} from '../../utils/api/api-client';
import {ApiPatient} from '../../utils/api/patients-types';
import {formatNA} from '../../utils/format';
import {isUUID} from '../../utils/validation';

export interface PatientPageProps {
    patient: ApiPatient;
    edit?: boolean;
}

export default function PatientPage({patient: initialPatient, edit}: PatientPageProps) {
    const {t} = useTranslation();
    const [patient, setPatient] = useState(initialPatient);
    const onUpdate = useCallback((patient: ApiPatient) => {
        // TODO: Notification
        setPatient(patient);
    }, [setPatient]);

    const title = t('common:patient.aPatient', {name: formatNA(t, patient.firstName) + ' ' + formatNA(t, patient.lastName)});
    return (
        <MainLayout title={title} section='patientList'>
            <Container>
                <PageHeader
                    title={title}
                    back={routes.patientList()}
                />
                <PatientForm patient={patient} onChange={onUpdate} initialEditable={edit}/>
            </Container>
        </MainLayout>
    );
}

export async function getServerSideProps({params, query}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<PatientPageProps>> {
    const {patientId} = params as any;
    if (!isUUID(patientId)) {
        return {notFound: true};
    }

    const res = await apiClient.fetch<ApiPatient>({service: 'patients', url: '/patient/' + encodeURIComponent(patientId)});
    if (!res.success) {
        if (res.error.code === 'PATIENT_NOT_FOUND') {
            return {notFound: true};
        }
        throw new UnhandledApiError(res.error);
    }

    const patient = res.result;
    return {props: {patient, edit: query.edit === 'true'}};
}
