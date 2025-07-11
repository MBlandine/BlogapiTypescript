"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_1 = require("../controllers/post");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/posts', post_1.getAllPosts);
router.get('/posts/:id', post_1.getPostById);
router.post('/posts', authMiddleware_1.authMiddleware, post_1.createPost);
router.put('/posts/:id', authMiddleware_1.authMiddleware, post_1.updatePost);
router.delete('/posts/:id', authMiddleware_1.authMiddleware, post_1.deletePost);
exports.default = router;
