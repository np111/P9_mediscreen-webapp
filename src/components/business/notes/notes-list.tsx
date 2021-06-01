import React from 'react';
import {ApiPatient} from '../../../utils/api/patients-types';

export interface NotesListProps {
    patient: ApiPatient;
}

export function NotesList({patient}: NotesListProps) {
    return <>Test</>;
}
