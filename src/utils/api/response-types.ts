export type ApiResponse<T = any> = SuccessApiResponse<T> | FailedApiResponse;

interface SuccessApiResponse<T = any> {
    success: true;
    result: T;
}

interface FailedApiResponse {
    success: false;
    error: ApiError;
}

export interface ApiError {
    type: ApiErrorType;
    code: string;
    message: string;
    metadata?: any;
}

export type ApiErrorType = 'CLIENT' | 'SERVICE' | 'UNKNOWN';
