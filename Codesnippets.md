export const getAllPosts = async () => {
	const { data } = await axiosInstance.get('/forum');
	return data;
};

export const deletePost = async (id) => {
	return await axiosInstance.delete(`/forum/${id}`);
};

export const deleteReply = async (postId, replyId) => {
	return await axiosInstance.delete(`/forum/${postId}/replies/${replyId}`);
};
