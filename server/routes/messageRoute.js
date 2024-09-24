import express from 'express';
import { sendMessage, getMessage, deleteMessage } from '../controllers/messageController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

router.route("/send/:id").post(isAuthenticated, sendMessage);
router.route("/:id").delete(isAuthenticated, deleteMessage);
router.route("/:id").get(isAuthenticated, getMessage);

export default router;