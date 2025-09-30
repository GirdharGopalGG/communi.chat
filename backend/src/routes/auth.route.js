import express from 'express'
import { signup, login, logout, updateProfile } from '../controllers/auth.controller.js'
import { validateRequest } from '../middlewares/validate.js'
import { loginSchema, signupSchema } from '../validations/auth.validation.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { arcjetMiddleware } from '../middlewares/arcjet.middleware.js'

const router = express.Router() 
router.use(arcjetMiddleware)


router.post('/signup',validateRequest(signupSchema),signup)
router.post('/login',validateRequest(loginSchema),login)
router.post('/logout',logout)
router.put('/updateProfile',authMiddleware,updateProfile)
router.get('/check',authMiddleware,(req,res)=>{
    res.status(200).json(req.user)
})

export default router