import {EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined} from '@ant-design/icons';
import {matchSorter} from 'match-sorter';
import React, {useCallback, useMemo, useState} from 'react';
import useSWR from 'swr';
import {routes} from '../../../routes';
import {apiClient} from '../../../utils/api/api-client';
import {ApiPatient} from '../../../utils/api/patients-types';
import {Button} from '../../ui/button';
import {Input} from '../../ui/form/input';
import {useTranslation} from '../../ui/i18n/use-translation';
import {Space} from '../../ui/layout/space';
import {TableProps} from '../../ui/table';
import {SkeletonTable} from '../../ui/table/skeleton-table';
import {Link} from '../../ui/util/link';
import {Birthdate} from './birthdate';
import {FirstName} from './first-name';
import {Gender} from './gender';
import {LastName} from './last-name';

export function PatientsTable() {
    const {t} = useTranslation();
    const {data: patients} = useSWR<ApiPatient[]>(['patients', '/patient'], apiClient.fetchSWR); // TODO: Error handling

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

    const [search, setSearch] = useState('');
    const onSearchChange = useCallback((e) => setSearch(e.target.value), [setSearch]);
    const filteredPatients = useMemo(() => !patients ? undefined : filterPatients(patients, search), [patients, search]);

    return (
        <>
            <Input
                prefix={<SearchOutlined style={{opacity: .5}}/>}
                allowClear={true}
                value={search}
                onChange={onSearchChange}
            />
            <Link {...routes.addPatient()}>
                <Button title={t('common:patient.addPatient')}><PlusOutlined/></Button>
            </Link>
            <SkeletonTable
                {...tableProps}
                dataSource={filteredPatients}
            />
        </>
    );
}

function filterPatients(patients: ApiPatient[], search: string) {
    if (search) {
        patients = search
            .split(/\s+/)
            .filter((word) => !!word.length)
            .reduceRight(
                (patients, word) => matchSorter(patients, word, {keys: ['firstName', 'lastName']}),
                patients);
    }
    return patients;
}
