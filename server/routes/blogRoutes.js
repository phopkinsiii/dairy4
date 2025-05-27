import express from 'express';
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from '../controllers/blogController.js';
import {protect, adminProtect} from '../middleware/authMiddleware.js';

const router = express.Router();





//Protected Routes
//Create new post
router.post('/', protect, adminProtect, createPost)
//Get all posts route
router.get('/', protect, getAllPosts);

//Get single post by id
router.get('/:id', protect, getPostById);

//Update Post
router.put('/:id', protect, adminProtect, updatePost)

//Delete Post
router.delete('/:id', protect, adminProtect, deletePost)

export default router;

