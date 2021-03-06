import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import React, {useCallback, useState} from 'react';
import useSWR from 'swr';
import {apiClient, UnhandledApiError} from '../../../utils/api/api-client';
import {ApiNote} from '../../../utils/api/notes-types';
import {ApiPatient} from '../../../utils/api/patients-types';
import {useCatchAsyncError} from '../../../utils/react-utils';
import {Button} from '../../ui/button';
import {useTranslation} from '../../ui/i18n/use-translation';
import {List} from '../../ui/layout/list';
import {Modal} from '../../ui/layout/modal';
import {PageHeader} from '../../ui/layout/page-header';
import {Space} from '../../ui/layout/space';
import {Popconfirm} from '../../ui/popconfirm';
import {Skeleton} from '../../ui/skeleton';
import {ErrorPane} from '../../ui/util/error';
import {notification} from '../../ui/util/notification';
import {AssessmentBanner} from '../assessments/assessment-banner';
import {getPatientName} from '../patients/patient-utils';
import {NoteForm} from './note-form';

export interface NotesListProps {
    patient: ApiPatient;
    assessmentKey?: any;
    onChange?: () => void;
}

export function NotesList({patient, assessmentKey, onChange}: NotesListProps) {
    const {t} = useTranslation();
    const catchAsyncError = useCatchAsyncError();

    const {data: notes, revalidate: revalidateNotes, error} = useSWR<ApiNote[]>(
        ['notes', '/note?patientId=' + encodeURIComponent(patient.id)],
        apiClient.fetchSWR);
    const notifyChange = useCallback(() => {
        onChange?.();
        revalidateNotes();
    }, [onChange, revalidateNotes]);

    const [editNote, setEditNote] = useState<{key: number; note?: ApiNote} | undefined>(undefined);
    const showEditNote = useCallback((note?: ApiNote) => setEditNote({key: Date.now() + Math.random(), note}), [setEditNote]);
    const showAddNote = useCallback(() => showEditNote(), [showEditNote]);
    const hideEditNote = useCallback(() => setEditNote(undefined), []);
    const onNoteUpdate = useCallback(() => {
        notification.open({type: 'success', message: t('common:note.noteSaved')});

        hideEditNote();
        notifyChange();
    }, [t, notifyChange, hideEditNote]);

    const renderNoteItem = useCallback((note: ApiNote) => {
        function updateNote() {
            showEditNote(note);
        }

        function deleteNote() {
            apiClient.fetch<ApiPatient>({
                service: 'notes',
                url: '/note/' + encodeURIComponent(note.id),
                method: 'DELETE',
            }).then((res) => {
                if (res.success || res.error.code === 'NOTE_NOT_FOUND') {
                    notification.open({type: 'success', message: t('common:note.noteDeleted')});

                    return notifyChange();
                }
                throw new UnhandledApiError(res.error);
            }).catch((err) => {
                catchAsyncError(err);
            });
        }

        return <NoteItem key={note.id} note={note} onUpdateClick={updateNote} onDeleteClick={deleteNote}/>;
    }, [t, catchAsyncError, notifyChange, showEditNote]);

    if (error) {
        return <ErrorPane error={error}/>;
    }

    return (
        <>
            <PageHeader
                title={t('common:note.notes')}
                extra={(
                    <Space wrap={true} divider={true}>
                        <AssessmentBanner key={assessmentKey} patient={patient}/>
                        <Button type='primary' onClick={showAddNote}>{t('common:note.addNote')}</Button>
                    </Space>
                )}
            />
            <div>
                <Modal
                    visible={!!editNote}
                    onCancel={hideEditNote}
                    title={t('common:note.addNoteFor', {patient: getPatientName(t, patient)})}
                    width='1000px'
                    footer={null}
                >
                    <NoteForm
                        key={editNote?.key}
                        patient={patient}
                        note={editNote?.note}
                        onUpdate={onNoteUpdate}
                    />
                </Modal>
                {!notes ? <Skeleton paragraph={{rows: 4}} active={true}/> : (
                    <List
                        itemLayout='vertical'
                        dataSource={notes}
                        renderItem={renderNoteItem}
                    />
                )}
            </div>
        </>
    );
}

interface NoteItemProps {
    note: ApiNote;
    onUpdateClick?: () => void;
    onDeleteClick?: () => void;
}

function NoteItem({note, onUpdateClick, onDeleteClick}: NoteItemProps) {
    const {t} = useTranslation();

    return (
        <List.Item
            actions={[
                <div key={0}>
                    <Space>
                        {note.createdAt}
                        {note.updatedAt === note.createdAt ? undefined : (
                            'Updated on ' + note.updatedAt
                        )}
                    </Space>
                </div>,
                <Button key={1} type='link' size='small' onClick={onUpdateClick}><EditOutlined/></Button>,
                (
                    <Popconfirm key={2} title={t('common:note.doYouWantToDelete')} okText={t('common:yes')} onConfirm={onDeleteClick}>
                        <Button type='link' size='small'><DeleteOutlined/></Button>
                    </Popconfirm>
                ),
            ]}
        >
            {note.content}
        </List.Item>
    );
}
