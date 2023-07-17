
/* eslint-disable @typescript-eslint/no-explicit-any */

export type RequestError = {
    message?: string;
    response?: {
        data?: any;
        status?: number;
        statusText?: string;
    };
};

export class HttpError {
    static error (error?: RequestError): HttpError | null {
        if (error) {
            return new HttpError(
                error.message,
                error.response?.status,
                error.response?.data,
                error.response?.statusText
            );
        }
        return null;
    }

    constructor(
        public message: string = '',
        public statusCode: number = 0,
        public error: any = null,
        public statusText: string = ''
    ) { }
}

export enum ErrorMessages {
    NOT_FOUND = 'Not Found',
    TOKEN_EXPIRED = 'Token is invalid. Please start session again.',
    UNEXPECTED_ERROR = 'Oops, something is wrong.',
}
