import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getAllContacts, getMessageByUserId, getChatPartner, sendMessage } from "../controllers/message.controller.js";
import { arcjetMiddleware } from "../middlewares/arcjet.middleware.js";

const router = express.Router()

router.use(arcjetMiddleware)
router.use(authMiddleware)

router.get('/contacts',  getAllContacts)
router.get('/chats',  getChatPartner)
router.get('/:id',  getMessageByUserId)
router.post('/send/:id',  sendMessage)


export default router