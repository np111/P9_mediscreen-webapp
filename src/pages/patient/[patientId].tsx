import {GetServerSidePropsContext, GetServerSidePropsResult} from 'next';
import React, {useCallback, useState} from 'react';
import {AssessmentBanner} from '../../components/business/assessments/assessment-banner';
import {NotesList} from '../../components/business/notes/notes-list';
import {PatientForm} from '../../components/business/patients/patient-form';
import {MainLayout} from '../../components/layouts/main-layout';
import {useTranslation} from '../../components/ui/i18n/use-translation';
import {Container} from '../../components/ui/layout/container';
import {PageHeader} from '../../components/ui/layout/page-header';
import {AppRouter, routes} from '../../routes';
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
    const [assessmentKey, setAssessmentKey] = useState(() => Math.random());

    const onUpdate = useCallback((patient: ApiPatient) => {
        // TODO: Notification
        setPatient(patient);
        setAssessmentKey(Math.random());
    }, [setPatient]);
    const onDelete = useCallback(() => {
        // TODO: Notification
        return AppRouter.push(routes.patientList());
    }, []);

    const title = t('common:patient.aPatient', {name: formatNA(t, patient.firstName) + ' ' + formatNA(t, patient.lastName)});
    return (
        <MainLayout title={title} section='patientList'>
            <Container>
                <PageHeader
                    title={title}
                    back={routes.patientList()}
                />
                <div>
                    <PatientForm patient={patient} onChange={onUpdate} onDelete={onDelete} initialEditable={edit}/>
                </div>
                <div>
                    <AssessmentBanner key={assessmentKey} patient={patient}/>
                </div>
                <div>
                    <NotesList patient={patient}/>
                </div>
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
