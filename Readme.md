const { state, fetchPostById } = useBlogContext();
const { singlePost: post, loading } = state;

useEffect(() => {
	fetchPostById(id);
}, [id, fetchPostById]);

if (loading || !post) return <div className='p-10 text-lg'>Loading post...</div>;
