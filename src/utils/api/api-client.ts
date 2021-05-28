import getConfig from 'next/config';
import {ApiError, ApiResponse} from './response-types';

export interface ApiFetchRequest {
    service: string;
    method?: string;
    url: string;
    body?: any;
}

export class ApiClient {
    private readonly _servicesBaseUrl: { [service: string]: string };

    public constructor(servicesBaseUrl: { [service: string]: string }) {
        this._servicesBaseUrl = servicesBaseUrl;
    }

    public fetch = <T = any>({service, method, url, body}: ApiFetchRequest): Promise<ApiResponse<T>> => {
        const headers: any = {};

        // Serialize body (and auto-detect method)
        if (body) {
            method = method || 'POST';
            body = JSON.stringify(body);
            headers['Content-Type'] = 'application/json;charset=utf-8';
        }
        method = method || 'GET';

        // Select service baseUrl
        let serviceBaseUrl = this._servicesBaseUrl[service] || '';
        if (serviceBaseUrl.endsWith('/')) {
            serviceBaseUrl = serviceBaseUrl.substr(0, serviceBaseUrl.length - 1);
        }

        // Fetch
        const input: RequestInfo = serviceBaseUrl + url;
        const init: RequestInit = {method, headers, body};
        return window.fetch(input, init).then((httpRes): Promise<ApiResponse<T>> => {
            switch (Math.floor(httpRes.status / 100)) {
                case 2:
                    return this._parseJson(httpRes).then((result) => ({success: true, result}));
                case 4:
                    return this._parseJson(httpRes).then((error) => {
                        if (typeof error === 'object' && error && typeof error.code === 'string' && typeof error.message === 'string') {
                            if (error.type !== 'SERVICE') {
                                throw new ApiException('Client-side exception (' + error.code + ')', error);
                            }
                            return {success: false, error};
                        }
                        throw new ApiException('Unsupported server response: incomplete error fields');
                    });
                case 5:
                    throw new ApiException('Server exception: HTTP ' + httpRes.status);
                default:
                    throw new ApiException('Unsupported server response: HTTP ' + httpRes.status);
            }
        }).catch((e: any): ApiResponse<T> => {
            if (e && e.name === 'AbortError') {
                return {success: false, error: {type: 'CLIENT', code: '_ABORTED', message: 'Request was aborted by the client'}};
            }
            throw e;
        });
    };

    public fetchOrThrow = <T = any>(req: ApiFetchRequest): Promise<T> => {
        return this.fetch<T>(req).then((res) => {
            if (!res.success) {
                throw new UnhandledApiError(res.error);
            }
            return res.result;
        });
    };

    public fetchSWR = <T = any>(service: string, url: string): Promise<T> => {
        return this.fetchOrThrow<T>({service, url});
    };

    private _parseJson(httpRes: Response) {
        switch (httpRes.status) {
            default:
                return httpRes.json().catch((err) => {
                    throw new ApiException('Unsupported server response: invalid json', err);
                });
            case 204:
                return Promise.resolve(undefined);
        }
    }
}

export class ApiException extends Error {
    error?: ApiError;
    cause?: Error;

    constructor(message: string, error?: ApiError, cause?: Error) {
        super(message);
        this.error = error;
        this.cause = cause;
    }
}

export class UnhandledApiError extends ApiException {
    constructor(error: ApiError) {
        super('Unhandled API error', error);
    }
}

export const apiClient = (() => {
    const config = getConfig();
    const {servicesBaseUrl} = config.publicRuntimeConfig;
    return new ApiClient(servicesBaseUrl);
})();
