import React, {useCallback, useState} from 'react';
import {Alert} from '../alert';
import {Button} from '../button';
import {useTranslation} from '../i18n/use-translation';
import {Modal} from '../layout/modal';
import {Tag} from '../tag';

export interface ErrorPaneProps {
    error: Error;
}

export function ErrorPane({error}: ErrorPaneProps) {
    const {t} = useTranslation();
    const [details, setDetails] = useState(false);
    const showDetails = useCallback(() => setDetails(true), []);

    return (
        <Alert
            type='error'
            showIcon={true}
            message={<ErrorMessage error={error}/>}
            description={!details ? (
                <Button type='text' size='small' onClick={showDetails}>{t('common:showDetails')}</Button>
            ) : (
                <ErrorDetails error={error}/>
            )}
        />
    );
}

export interface ErrorTagProps {
    error: Error;
}

export function ErrorTag({error}: ErrorTagProps) {
    const [details, setDetails] = useState(false);
    const showDetails = useCallback(() => setDetails(true), []);
    const hideDetails = useCallback(() => setDetails(false), []);

    return (
        <>
            <a onClick={showDetails}>
                <Tag color='red'>
                    <ErrorMessage error={error} short={true}/>
                </Tag>
            </a>
            <Modal
                visible={details}
                onCancel={hideDetails}
                title={<ErrorMessage error={error}/>}
                footer={null}
            >
                <ErrorDetails error={error}/>
            </Modal>
        </>
    );
}

interface ErrorMessageProps {
    error: Error;
    short?: boolean;
}

function ErrorMessage({error, short}: ErrorMessageProps) {
    const {t} = useTranslation();

    return <>{t('common:errors.unexpected' + (short ? 'Short' : ''))}</>;
}

interface ErrorDetailsProps {
    error: Error;
}

function ErrorDetails({error}: ErrorDetailsProps) {
    return <pre>{'' + error}</pre>;
}
