export const loginUser = async (credentials, dispatch) => {
	try {
		dispatch({ type: 'SET_LOADING', payload: true });

		const response = await axiosInstance.post('/users/login', credentials);
		dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
		return response.data;
	} catch (error) {
		dispatch({
			type: 'SET_ERROR',
			payload: error.response?.data?.message || 'Request Failed',
		});
		throw error; // ✅ This is critical!
	}
};
catch (err) {
	setError(err.response?.data?.message || 'Login failed.');
}
{error && (
	<div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded text-sm">
		{error}
	</div>
)}
