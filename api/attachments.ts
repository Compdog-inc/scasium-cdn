import type { NowRequest, NowResponse } from '@vercel/node';

export default function (req: NowRequest, res: NowResponse) {
    res.json({
        result: req.method + " OK"
    });
}