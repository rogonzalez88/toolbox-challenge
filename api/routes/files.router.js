import { Router } from 'express'
import { FileController } from '../controllers/index.js'

const router = new Router()

router.get('/list', FileController.getAllFiles)
router.get('/data', FileController.getAllFilesWithDetails)

export default router
