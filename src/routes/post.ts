import { Router } from 'express';
import {createPost,getAllPosts,getPostById,updatePost,deletePost,} from '../controllers/post';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/posts', getAllPosts);
router.get('/posts/:id', getPostById);
router.post('/posts', authMiddleware, createPost);
router.put('/posts/:id', authMiddleware, updatePost);
router.delete('/posts/:id',authMiddleware, deletePost);

export default router;