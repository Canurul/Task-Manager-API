import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import { createTask } from '../controllers/taskController';

const router = express.Router();

router.use(protect as express.RequestHandler)

router.post('/', createTask as express.RequestHandler);

export default router;