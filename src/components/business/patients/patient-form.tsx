import moment from 'moment';
import React, {useCallback, useState} from 'react';
import {apiClient, ApiException, UnhandledApiError} from '../../../utils/api/api-client';
import {ApiPatient} from '../../../utils/api/patients-types';
import {clearEmpty} from '../../../utils/query-utils';
import {useCatchAsyncError} from '../../../utils/react-utils';
import {Button} from '../../ui/button';
import {FormItem} from '../../ui/form';
import {DatePicker} from '../../ui/form/date-picker';
import {Input} from '../../ui/form/input';
import {Radio} from '../../ui/form/radio';
import {ToggleElement, ToggleForm} from '../../ui/form/toggle-form';
import {useForm} from '../../ui/form/use-form';
import {useTranslation} from '../../ui/i18n/use-translation';
import {HorizontalSpace, Space} from '../../ui/layout/space';
import {Popconfirm} from '../../ui/popconfirm';
import {Spin} from '../../ui/spin';
import {Address} from './address';
import {Birthdate} from './birthdate';
import {City} from './city';
import {Country} from './country';
import {CountrySelect} from './country-select';
import {FirstName} from './first-name';
import {Gender} from './gender';
import {LastName} from './last-name';
import styles from './patient-form.module.scss';
import {Phone} from './phone';
import {PostalCode} from './postal-code';
import {State} from './state';

export interface PatientFormProps {
    patient?: ApiPatient;
    editable: boolean;
    onUpdate?: (newPatient: ApiPatient) => void;
    onDelete?: () => void;
}

export function PatientForm({patient, editable, onUpdate, onDelete}: PatientFormProps) {
    const {t} = useTranslation();
    const catchAsyncError = useCatchAsyncError();

    const [form] = useForm();
    const [loading, setLoading] = useState(false);

    const updatePatient = useCallback((values) => {
        setLoading(true);
        apiClient.fetchOrThrow<ApiPatient>({
            service: 'patients',
            url: '/patient' + (patient ? '/' + encodeURIComponent(patient.id) : ''),
            body: valuesToPatient(values),
        }).then((newPatient) => {
            setLoading(false);
            onUpdate?.(newPatient);
        }).catch((err) => {
            setLoading(false);
            if (err instanceof ApiException) {
                // TODO: Error handling + form validation rules
                console.log('error', err.error);
                return;
            }
            catchAsyncError(err);
        });
    }, [patient, setLoading, catchAsyncError, form, onUpdate]);

    const deletePatient = useCallback(() => {
        if (!patient) return;
        setLoading(true);
        apiClient.fetch<ApiPatient>({
            service: 'patients',
            url: '/patient/' + encodeURIComponent(patient.id),
            method: 'DELETE',
        }).then((res) => {
            setLoading(false);
            if (res.success || res.error.code === 'PATIENT_NOT_FOUND') {
                onDelete?.();
                return;
            }
            throw new UnhandledApiError(res.error);
        }).catch((err) => {
            setLoading(false);
            catchAsyncError(err);
        });
    }, [patient, setLoading, catchAsyncError, onDelete]);

    return (
        <Spin spinning={loading}>
            <ToggleForm
                form={form}
                onFinish={updatePatient}
                layout={'horizontal'}
                initialValues={patientToValues(patient)}
                editable={editable}
                className={editable ? undefined : styles.colForm}
            >
                <FormItem name='firstName' label={t('common:patient.firstName')}>
                    <ToggleElement renderView={<FirstName/>} renderInput={<Input/>}/>
                </FormItem>
                <FormItem name='lastName' label={t('common:patient.lastName')}>
                    <ToggleElement renderView={<LastName/>} renderInput={<Input/>}/>
                </FormItem>
                <FormItem name='birthdate' label={t('common:patient.birthdate')}>
                    <ToggleElement renderView={<Birthdate/>} renderInput={<DatePicker/>}/>
                </FormItem>
                <FormItem name='gender' label={t('common:patient.gender')}>
                    <ToggleElement
                        renderView={<Gender/>}
                        renderInput={(
                            <Radio.Group>
                                <Space wrap={true}>
                                    <Radio.Button value={undefined}>{t('common:notAvailable')}</Radio.Button>
                                    <Radio.Button value='MALE'><Gender value='MALE'/></Radio.Button>
                                    <Radio.Button value='FEMALE'><Gender value='FEMALE'/></Radio.Button>
                                </Space>
                            </Radio.Group>
                        )}
                    />
                </FormItem>
                <FormItem name='phone' label={t('common:patient.phone')}>
                    <ToggleElement renderView={<Phone/>} renderInput={<Input placeholder='1 2223334444' prefix={'+'}/>}/>
                </FormItem>
                <FormItem name='address' label={t('common:patient.address')}>
                    <ToggleElement renderView={<Address/>} renderInput={<Input/>}/>
                </FormItem>
                <FormItem name='city' label={t('common:patient.city')}>
                    <ToggleElement renderView={<City/>} renderInput={<Input/>}/>
                </FormItem>
                <FormItem name='postalCode' label={t('common:patient.postalCode')}>
                    <ToggleElement renderView={<PostalCode/>} renderInput={<Input/>}/>
                </FormItem>
                <FormItem name='state' label={t('common:patient.state')}>
                    <ToggleElement renderView={<State/>} renderInput={<Input/>}/>
                </FormItem>
                <FormItem name='countryCode' label={t('common:patient.country')}>
                    <ToggleElement renderView={<Country/>} renderInput={<CountrySelect/>}/>
                </FormItem>
                {!editable ? undefined : (
                    <FormItem>
                        <HorizontalSpace>
                            <Button htmlType='submit' type='primary'>{t('common:save')}</Button>
                            {!patient ? undefined : (
                                <Popconfirm
                                    placement='topRight'
                                    title={t('common:patient.doYouWantToDelete')}
                                    okText={t('common:yes')}
                                    onConfirm={deletePatient}
                                >
                                    <Button danger={true}>{t('common:delete')}</Button>
                                </Popconfirm>
                            )}
                        </HorizontalSpace>
                    </FormItem>
                )}
            </ToggleForm>
        </Spin>
    );
}

function patientToValues(patient?: ApiPatient): any {
    return {
        ...patient,
        birthdate: !patient?.birthdate ? undefined : moment(patient.birthdate, 'YYYY-MM-DD'),
    };
}

function valuesToPatient(values: any): ApiPatient {
    return clearEmpty({
        ...values,
        birthdate: !values.birthdate ? undefined : values.birthdate.format('YYYY-MM-DD'),
    });
}
