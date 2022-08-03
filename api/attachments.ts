import type { NowRequest, NowResponse } from '@vercel/node';
import { Api } from '../utils/api';

export default function (req: NowRequest, res: NowResponse) {
    if (req.method === 'POST') {
        res.json({
            result: "POST OK"
        });
    } else {
        res.status(400).json(Api.CreateError({
            code: Api.ErrorCode.INVALID_FORM_BODY,
            message: -1
        }, [{
            errors: [{
                code: Api.ErrorCode.CONTENT_TYPE_INVALID,
                message: "Expected \"Content-Type\" header to be one of 'application/json'."
            }]
        }]));
    }
}