import express from "express";
import indexCtrl from '../controllers/index.controller';

let router = express.Router();

router.get('/', indexCtrl.index);

export default router;