import {EditOutlined, EyeOutlined, SearchOutlined} from '@ant-design/icons';
import React, {useMemo} from 'react';
import useSWR from 'swr';
import {Birthdate} from '../components/business/patient/birthdate';
import {FirstName} from '../components/business/patient/first-name';
import {Gender} from '../components/business/patient/gender';
import {LastName} from '../components/business/patient/last-name';
import {MainLayout} from '../components/layouts/main-layout';
import {Input} from '../components/ui/form/input';
import {useTranslation} from '../components/ui/i18n/use-translation';
import {Container} from '../components/ui/layout/container';
import {Space} from '../components/ui/layout/space';
import {TableProps} from '../components/ui/table';
import {SkeletonTable} from '../components/ui/table/skeleton-table';
import {Link} from '../components/ui/util/link';
import {routes} from '../routes';
import {apiClient} from '../utils/api/api-client';
import {ApiPatient} from '../utils/api/patients-types';

export default function IndexPage() {
    const {t} = useTranslation();
    const {data: patients} = useSWR<ApiPatient[]>(['patients', '/patient'], apiClient.fetchSWR);

    const tableProps = useMemo<TableProps<ApiPatient>>(() => ({
        rowKey: 'id',
        columns: [{
            title: t('common:patient.firstName'),
            dataIndex: 'firstName',
            render: function RenderFirstName(firstName, patient) {
                return <Link {...routes.patient({patientId: patient.id})}><a><FirstName value={firstName}/></a></Link>;
            },
        }, {
            title: t('common:patient.lastName'),
            dataIndex: 'lastName',
            render: function RenderLastName(lastName, patient) {
                return <Link {...routes.patient({patientId: patient.id})}><a><LastName value={lastName}/></a></Link>;
            },
        }, {
            title: t('common:patient.gender'),
            dataIndex: 'gender',
            render: function RenderGender(gender) {
                return <Gender value={gender}/>;
            },
        }, {
            title: t('common:patient.birthdate'),
            dataIndex: 'birthdate',
            render: function RenderBirthdate(birthdate) {
                return <Birthdate value={birthdate}/>;
            },
        }, {
            title: t('common:patient.actions'),
            key: 'actions',
            fixed: 'right',
            align: 'center',
            width: 1,
            render: function RenderActions(ignored, patient) {
                return (
                    <Space>
                        <Link {...routes.patient({patientId: patient.id})}>
                            <a><EyeOutlined/></a>
                        </Link>
                        <Link {...routes.patient({patientId: patient.id, edit: true})}>
                            <a><EditOutlined/></a>
                        </Link>
                    </Space>
                );
            },
        }],
        size: 'small',
        bordered: true,
    }), [t]);

    return (
        <MainLayout title={t('common:page.patientList')} section='patientList'>
            <Container>
                <Input
                    prefix={<SearchOutlined style={{opacity: .5}}/>}
                    allowClear={true}
                />
                <SkeletonTable
                    {...tableProps}
                    dataSource={patients}
                />
            </Container>
        </MainLayout>
    );
}
