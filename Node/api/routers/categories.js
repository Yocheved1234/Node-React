import express from 'express'
import { checkName ,checkToken} from '../middlewares.js';

import {
    getAll,
    create,
    remove,
    update,
    getApartCategories
} from '../controllers/categories.js'

const router = express.Router()

router.get('', getAll)
router.get('/:Categories',getApartCategories)
router.post('',create)
router.delete('/:id',checkToken, remove)
router.patch('/:id',checkToken,checkName, update)

export default router;
