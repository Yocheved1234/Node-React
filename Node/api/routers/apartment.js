import express from 'express'
import { checkPrice,checkBed,checkToken } from '../middlewares.js';
import {
    getAll,
    create,
    remove,
    update,
    getWhere1,
    getWhere2,
    getWhere3,
    getWhere4,
    getWhere5,
    getWhere6,
    getWhere7,
    getWhere8,
    getWhere9,
    getWhere10,
} from '../controllers/apartment.js'

const router = express.Router()
router.get('', getAll)
router.post('',checkPrice,checkToken,checkBed,create)
router.delete('/:id',checkToken, remove)
router.patch('/:id', update)
router.get('/:id', getWhere1);
router.get('/getWhere2/:categories', getWhere2);
router.get('/getWhere3/:city', getWhere3);
router.get('/getWhere4/:numBed', getWhere4);
router.get('/getWhere5/:numBed', getWhere5);
router.get('/getWhere6/:numBed', getWhere6);
router.get('/getWhere7/:price', getWhere7);
router.get('/getWhere8/:price', getWhere8);
router.get('/getWhere9/:price', getWhere9);
router.get('/getWhere10/:advertiser', getWhere10);

export default router;

