// @ts-nocheck
import ForumPost from '../models/forumPostModel.js';

export const createPost = async (req, res) => {
	const { title, content } = req.body;
	const post = new ForumPost({ title, content, user: req.user._id });
	const savedPost = await post.save();
	res.status(201).json(savedPost);
};

export const getAllPosts = async (req, res) => {
	const posts = await ForumPost.find()
		.populate('user', 'name')
		.sort({ createdAt: -1 });
	res.json(posts);
};

export const getPostById = async (req, res) => {
	const post = await ForumPost.findById(req.params.id).populate('user', 'name');
	if (!post) return res.status(404).json({ message: 'Post not found' });
	res.json(post);
};

export const addReply = async (req, res) => {
	const post = await ForumPost.findById(req.params.id);
	if (!post) return res.status(404).json({ message: 'Post not found' });

	post.replies.push({ user: req.user._id, content: req.body.content });
	await post.save();
	res.status(201).json(post);
};

export const deletePost = async (req, res) => {
	const post = await ForumPost.findById(req.params.id);
	if (!post) return res.status(404).json({ message: 'Post not found' });

	await ForumPost.findByIdAndDelete(req.params.id);
	res.json({ message: 'Post deleted' });
};

// DELETE /api/forum/:postId/replies/:replyId
export const deleteReply = async (req, res) => {
	try {
		const post = await ForumPost.findById(req.params.postId);
		if (!post) {
			return res.status(404).json({ message: 'Post not found' });
		}

		// Find the reply by ID
		const replyIndex = post.replies.findIndex(
			(reply) => reply._id.toString() === req.params.replyId
		);

		if (replyIndex === -1) {
			return res.status(404).json({ message: 'Reply not found' });
		}

		// Remove the reply and save
		post.replies.splice(replyIndex, 1);
		const updatedPost = await post.save();

		res.status(200).json(updatedPost);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

