export interface ApiNote {
    id: string;
    patientId: string;
    createdAt?: string;
    updatedAt?: string;
    content: string;
}

export const API_NOTE_MAX_LENGTH = 10_000;
