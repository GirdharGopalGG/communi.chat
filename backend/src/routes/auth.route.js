import express from 'express'
import { signup, login, logout } from '../controllers/auth.controller.js'
import { validateRequest } from '../middlewares/validate.js'
import { loginSchema, signupSchema } from '../validations/auth.validation.js'

const router = express.Router()

router.post('/signup',validateRequest(signupSchema),signup)
router.post('/login',validateRequest(loginSchema),login)
router.post('/logout',logout)

export default router