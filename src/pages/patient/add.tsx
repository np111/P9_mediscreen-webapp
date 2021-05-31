import React, {useCallback} from 'react';
import {PatientForm} from '../../components/business/patient/patient-form';
import {MainLayout} from '../../components/layouts/main-layout';
import {useTranslation} from '../../components/ui/i18n/use-translation';
import {Container} from '../../components/ui/layout/container';
import {PageHeader} from '../../components/ui/layout/page-header';
import {AppRouter, routes} from '../../routes';
import {ApiPatient} from '../../utils/api/patients-types';

export default function AddPatientPage() {
    const {t} = useTranslation();
    const onCreate = useCallback((patient: ApiPatient) => {
        // TODO: Notification
        return AppRouter.push(routes.patient({patientId: patient.id}));
    }, []);

    const title = t('common:patient.addPatient');
    return (
        <MainLayout title={title} section='patientList'>
            <Container>
                <PageHeader
                    title={title}
                    back={routes.patientList()}
                />
                <PatientForm onChange={onCreate}/>
            </Container>
        </MainLayout>
    );
}
