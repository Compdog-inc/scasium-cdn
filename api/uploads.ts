import type { NowRequest, NowResponse } from '@vercel/node';
import fs from 'fs';

export default function (req: NowRequest, res: NowResponse) {
    if (req.method === 'GET') {
        if (req.url) {
            const imgFile = req.url.replace('/api/uploads/', '').split('/')[0];
            if (imgFile.includes('.')) {
                // used later const imgName = imgFile.split('.')[0];
                const imgExt = imgFile.split('.')[1].toUpperCase();

                if (imgExt === 'PNG') {
                    fs.readFile('../internal/uploads/demoimage.png', (err, data) => {
                        if (err) {
                            console.log(err);
                            res.status(500).end();
                            return;
                        }

                        res.setHeader('cache-control', 'public, max-age=31536000');
                        res.setHeader('content-type', 'image/png');
                        res.setHeader('content-length', data.byteLength);
                        res.status(200).write(data, () => {
                            res.end();
                        });
                    });
                } else {
                    res.status(404).end();
                }
            } else {
                res.status(404).end();
            }
        } else {
            res.status(400).end();
        }
    } else {
        res.status(200).end();
    }
}