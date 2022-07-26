import type { NowRequest, NowResponse } from '@vercel/node';
import { Api } from '../../utils/api';

export default function (req: NowRequest, res: NowResponse) {
    if (req.method === 'GET') {
        const id = typeof (req.query.id) === 'string' ? req.query.id : req.query.id[0];

        const attachment: Api.Attachment =
        {
            id: id,
            url: "a5B56C2365A56c65a65362565c.png",
            name: "DemoImage.png",
            blur: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAMAAAC+Ge+yAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA4VBMVEUlJSUZGRkNDQ0TExMdHR0qKipaWlrn5+eCgoI3NzcSEhIWFhYREREjIyNUVFTi4uK8vLyBgYFPT09dXV04ODh7e3vExMSKioqcnJx+fn6Hh4elpaWGhoadnZ1ycXGNjY2+vr6enp6urq7CwsLX19f///+goKDS0tLa2trU1NTu7u39//+YmJiwsLDGxsbV1dXR0NDS6PWSzPJubm5ra2uSkpKpqamxr66uwM1nuO9PrOtCQkJgX1+HhoV6ent5gIWPwuUomu4kl+1ycnI4QEVFZHs1cJ08iMFFgq0+kc0unO1RT3HTAAAAAWJLR0QlwwHJDwAAAAd0SU1FB+YHGgUwBSiqOUMAAAABb3JOVAHPoneaAAAAYklEQVQI12NgYGRiZmFlY2fg4OTi5uHl42cQEGQQEhYRFWMQl5CUkpaRZWeQk1dQVFJWUWVQU1NW19DU0mbQkdTV0zcwNGIwNjE1M7ewtGKwtrG1s3dwdGJwdnF1c/fw9AIATe4LQYM4bTsAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDctMjZUMDU6NDg6MDUrMDA6MDADRnLYAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA3LTI2VDA1OjQ4OjA1KzAwOjAwchvKZAAAAABJRU5ErkJggg==",
            type: Api.AttachmentType.Image
        };

        res.status(200).json(attachment);
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