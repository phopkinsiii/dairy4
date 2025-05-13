import express from 'express';
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from '../controllers/blogController.js';
import {protect, adminProtect} from '../middleware/authMiddleware.js';

const router = express.Router();

//Get all posts route
router.get('/', getAllPosts);

//Get single post by id
router.get('/:id', getPostById);

//Protected Routes
//Create new post
router.post('/', protect, adminProtect, createPost)

//Update Post
router.put('/:id', protect, adminProtect, updatePost)

//Delete Post
router.delete('/:id', protect, adminProtect, deletePost)

export default router;

