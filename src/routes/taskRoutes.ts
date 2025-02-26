import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import { createTask, getAllTasks, getTaskById } from '../controllers/taskController';

const router = express.Router();

router.use(protect as express.RequestHandler)
router.post('/', createTask as express.RequestHandler);
router.get('/', getAllTasks as express.RequestHandler);
router.get('/:id', getTaskById as express.RequestHandler);

export default router;