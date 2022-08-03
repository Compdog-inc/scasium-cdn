import type { NowRequest, NowResponse } from '@vercel/node';
import { Api } from '../../utils/api';
import createFetch from '@vercel/fetch';
const fetch = createFetch();

export default function (req: NowRequest, res: NowResponse) {
    if (req.method === 'GET') {
        const id = typeof (req.query.id) === 'string' ? req.query.id : req.query.id[0];

        fetch("https://www.googleapis.com/drive/v3/files/" + id + "?key=" + process.env.CONTENT_DOWNLOAD_API_KEY + "&alt=media")
            .then(r => {
                if (r.status !== 200) {
                    res.status(r.status).json(Api.CreateError({
                        code: Api.ErrorCode.ACCESS_DENIED,
                        message: -1
                    }, [{
                        errors: [{
                            code: Api.ErrorCode.CONTENT_TYPE_INVALID,
                            message: "Unknown API error"
                        }]
                    }]));
                } else {
                    res.setHeader('content-type', r.headers.get('content-type') ?? "application/x-msdownload");
                    res.setHeader('expires', r.headers.get('expires') ?? "");
                    res.setHeader('date', r.headers.get('date') ?? "");
                    r.body?.pipe(res);
                }
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