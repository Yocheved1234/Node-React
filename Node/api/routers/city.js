import express from 'express'
import { checkName, checkToken } from '../middlewares.js';

import {
    getAll,
    create,
    remove,
    update,
    getApart
} from '../controllers/city.js'

const router = express.Router()

router.get('', getAll)
router.get('/:city',getApart)
router.post('', create)
router.delete('/:id',checkToken, remove)
router.patch('/:id',checkToken,checkName, update)

export default router;
