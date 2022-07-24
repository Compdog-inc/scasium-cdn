import { Request, Response } from "express";

export default async (_: Request, res: Response) => {
    res.json({ result: "ok" });
};