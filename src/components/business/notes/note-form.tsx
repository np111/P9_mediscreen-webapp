import React, {useCallback, useState} from 'react';
import {apiClient, ApiException} from '../../../utils/api/api-client';
import {API_NOTE_MAX_LENGTH, ApiNote} from '../../../utils/api/notes-types';
import {ApiPatient} from '../../../utils/api/patients-types';
import {useCatchAsyncError} from '../../../utils/react-utils';
import {Button} from '../../ui/button';
import {Form, FormItem} from '../../ui/form';
import {Input} from '../../ui/form/input';
import {useForm} from '../../ui/form/use-form';
import {useTranslation} from '../../ui/i18n/use-translation';
import {Spin} from '../../ui/spin';
import {notification} from '../../ui/util/notification';

export interface NoteFormProps {
    patient: ApiPatient;
    note?: ApiNote;
    onUpdate?: (newNote: ApiNote) => void;
}

export function NoteForm({patient, note, onUpdate}: NoteFormProps) {
    const {t} = useTranslation();
    const catchAsyncError = useCatchAsyncError();

    const [form] = useForm();
    const [loading, setLoading] = useState(false);

    const updateNote = useCallback(({content}) => {
        setLoading(true);
        apiClient.fetchOrThrow<ApiNote>({
            service: 'notes',
            url: '/note' + (note ? '/' + encodeURIComponent(note.id) : ''),
            body: {patientId: patient.id, ...note, content},
        }).then((newNote) => {
            setLoading(false);
            onUpdate?.(newNote);
        }).catch((err) => {
            setLoading(false);
            if (err instanceof ApiException && err.error?.code === 'VALIDATION_FAILED') {
                notification.open({type: 'error', message: err.error.message});
                return;
            }
            catchAsyncError(err);
        });
    }, [patient, note, setLoading, catchAsyncError, onUpdate]);

    // TBD: Form validation rules
    return (
        <Spin spinning={loading}>
            <Form
                form={form}
                onFinish={updateNote}
                layout='vertical'
                initialValues={{content: note?.content || ''}}
            >
                <FormItem name='content' label={t('common:note.content')}>
                    <Input.TextArea rows={12} autoSize={false} showCount={true} maxLength={API_NOTE_MAX_LENGTH}/>
                </FormItem>
                <FormItem>
                    <Button htmlType='submit' type='primary'>{t(note ? 'common:edit' : 'common:add')}</Button>
                </FormItem>
            </Form>
        </Spin>
    );
}
