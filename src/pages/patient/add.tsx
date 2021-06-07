import React, {useCallback} from 'react';
import {PatientForm} from '../../components/business/patients/patient-form';
import {MainLayout} from '../../components/layouts/main-layout';
import {useTranslation} from '../../components/ui/i18n/use-translation';
import {Card} from '../../components/ui/layout/card';
import {Container} from '../../components/ui/layout/container';
import {PageHeader} from '../../components/ui/layout/page-header';
import {notification} from '../../components/ui/util/notification';
import {AppRouter, routes} from '../../routes';
import {ApiPatient} from '../../utils/api/patients-types';

export default function AddPatientPage() {
    const {t} = useTranslation();
    const onCreate = useCallback((patient: ApiPatient) => {
        notification.open({type: 'success', message: t('common:patient.patientSaved')});

        return AppRouter.push(routes.patient({patientId: patient.id}));
    }, [t]);

    const title = t('common:patient.addPatient');
    return (
        <MainLayout title={title} section='patientList'>
            <Container>
                <Card>
                    <PageHeader
                        title={title}
                        back={routes.patientList()}
                    />
                    <PatientForm onUpdate={onCreate} editable={true}/>
                </Card>
            </Container>
        </MainLayout>
    );
}
