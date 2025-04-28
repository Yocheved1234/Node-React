import express from 'express'
import { checkEmail, checkPhone,checkToken} from '../middlewares.js';

import {
    getAll,
    getByMailAdPas,
    create,
    remove,
    update
} from '../controllers/advertiser.js'

const router = express.Router()

router.get('', getAll,)
 router.post('/bymail', getByMailAdPas)
router.post('',checkEmail,checkPhone,create)
router.delete('/:id', remove)
router.patch('/:id',checkEmail,checkPhone, update)

export default router;
