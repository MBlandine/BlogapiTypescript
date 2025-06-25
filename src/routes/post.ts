import { Router } from 'express';
import {createPost,getAllPosts,getPostById,updatePost,deletePost,} from '../controllers/post';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', authMiddleware, createPost);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id',authMiddleware, deletePost);

export default router;