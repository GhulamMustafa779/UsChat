import express from 'express';
import { setConversation } from '../controllers/conversationController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

router.route("/:username").post(isAuthenticated, setConversation);

export default router;