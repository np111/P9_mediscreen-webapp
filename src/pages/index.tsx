import React from 'react';
import {PatientsTable} from '../components/business/patients/patients-table';
import {MainLayout} from '../components/layouts/main-layout';
import {useTranslation} from '../components/ui/i18n/use-translation';
import {Card} from '../components/ui/layout/card';
import {Container} from '../components/ui/layout/container';

export default function IndexPage() {
    const {t} = useTranslation();

    return (
        <MainLayout title={t('common:page.patientList')} section='patientList'>
            <Container>
                <Card>
                    <PatientsTable/>
                </Card>
            </Container>
        </MainLayout>
    );
}
