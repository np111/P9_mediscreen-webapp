export type ApiRiskLevel = 'NONE' | 'BORDERLINE' | 'IN_DANGER' | 'EARLY_ONSET';

export interface ApiCheckRiskRequest {
    patientId: string;
}

export interface ApiCheckRiskResult {
    riskLevel: ApiRiskLevel;
    terms: string[];
}
