import {GetServerSidePropsContext, GetServerSidePropsResult} from 'next';
import React, {useCallback, useState} from 'react';
import {NotesList} from '../../components/business/notes/notes-list';
import {PatientForm} from '../../components/business/patients/patient-form';
import {getPatientName} from '../../components/business/patients/patient-utils';
import {MainLayout} from '../../components/layouts/main-layout';
import {Button} from '../../components/ui/button';
import {useTranslation} from '../../components/ui/i18n/use-translation';
import {Card} from '../../components/ui/layout/card';
import {Container} from '../../components/ui/layout/container';
import {PageHeader} from '../../components/ui/layout/page-header';
import {AppRouter, routes} from '../../routes';
import {apiClient, UnhandledApiError} from '../../utils/api/api-client';
import {ApiPatient} from '../../utils/api/patients-types';
import {isUUID} from '../../utils/validation';

export interface PatientPageProps {
    patient: ApiPatient;
    edit?: boolean;
}

export default function PatientPage({patient: initialPatient, edit: initialEditable}: PatientPageProps) {
    const {t} = useTranslation();

    const [assessmentKey, setAssessmentKey] = useState(() => Math.random());
    const revalidateAssessment = useCallback(() => setAssessmentKey(Math.random()), [setAssessmentKey]);

    const [patient, setPatient] = useState(initialPatient);
    const [editable, setEditable] = useState(!!initialEditable);
    const toggleEditable = useCallback(() => setEditable(!editable), [editable, setEditable]);

    const onUpdate = useCallback((patient: ApiPatient) => {
        // TODO: Notification
        setEditable(false);
        setPatient(patient);
        revalidateAssessment();
    }, [setPatient, setEditable, revalidateAssessment]);
    const onDelete = useCallback(() => {
        // TODO: Notification
        return AppRouter.push(routes.patientList());
    }, []);

    const title = t('common:patient.aPatient', {name: getPatientName(t, patient)});
    return (
        <MainLayout title={title} section='patientList'>
            <Container>
                <Card>
                    <PageHeader
                        title={title}
                        back={routes.patientList()}
                        extra={(
                            <Button onClick={toggleEditable}>{t(!editable ? 'common:edit' : 'common:cancel')}</Button>
                        )}
                    />
                    <PatientForm patient={patient} editable={editable} onUpdate={onUpdate} onDelete={onDelete}/>
                </Card>
                <Card>
                    <NotesList patient={patient} assessmentKey={assessmentKey} onChange={revalidateAssessment}/>
                </Card>
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
