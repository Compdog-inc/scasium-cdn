import type { NowRequest, NowResponse } from '@vercel/node';

export default function (_: NowRequest, res: NowResponse) {
    res.json({
        result: "ok"
    })
}

//git comment