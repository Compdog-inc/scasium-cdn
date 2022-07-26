export namespace Api {
    export enum ErrorCode {
        CONTENT_TYPE_INVALID = 'CONTENT_TYPE_INVALID',
        NONE = 0,
        UNKNOWN_ATTACHMENT = 10016,
        ACCESS_DENIED = 20010,
        INVALID_FORM_BODY = 50035
    }

    export interface RequestPropError {
        code: number | string,
        message?: string | number
    }

    export interface RequestError {
        name?: string,
        errors: RequestPropError[]
    }

    export function MessageFromCode(code: ErrorCode | string | number): string {
        if (typeof (code) === 'string') code = Number(code);

        switch (code) {
            case ErrorCode.NONE:
                return 'None';
            case ErrorCode.ACCESS_DENIED:
                return 'Access Denied';
            case ErrorCode.INVALID_FORM_BODY:
                return 'Invalid Form Body';
        }
        return 'Unknown';
    }

    export function CreateError(error: RequestPropError, errors?: RequestError[]) {
        let err: any | null = null;

        for (const e of errors || []) {
            if (err == null) err = {};
            if (e.name) {
                err[e.name] = { '_errors': e.errors };
            } else {
                err['_errors'] = e.errors;
            }
        }

        let msg: string;

        if (typeof (error.message) === 'number' && error.message === -1) {
            msg = MessageFromCode(error.code);
        } else if (typeof (error.message) === 'string') {
            msg = error.message;
        } else {
            msg = 'None';
        }

        if (err != null) {
            return {
                code: error.code,
                errors: err,
                message: msg
            };
        } else {
            return {
                code: error.code,
                message: msg
            };
        }
    }

    export enum AttachmentType {
        Other = 0,
        Image = 1,
        Video = 2,
        Audio = 3,
        Document = 4,
        PDF = 5,
        Presentation = 6,
        Table = 7,
        HTML = 8,
        EXE = 9,
        APP = 10,
        APK = 11,
        ZIP = 12,
        RAR = 13,
        Archive = 14
    }

    export interface Attachment {
        id: string;
        url: string;
        thumb?: string;
        name: string;
        blur: string;
        type: AttachmentType;
    }
}