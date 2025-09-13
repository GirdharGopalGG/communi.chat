import express from 'express'
import { signup } from '../controllers/auth.controller.js'
import { validateRequest } from '../middlewares/validate.js'
import { signupSchema } from '../validations/auth.validation.js'

const router = express.Router()

router.post('/signup',validateRequest(signupSchema),signup)

export default router