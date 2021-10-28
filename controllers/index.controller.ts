import express from "express";

const startTime = new Date();

const index = (req: express.Request, res: express.Response) => {
    res.json({
        version: '1.0.0',
        stateTime: startTime.toISOString()
    });
}

export default {
    index
}