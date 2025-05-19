import validator from 'validator';

export const resetPassword = async (req, res) => {
	const { resetToken, newPassword } = req.body;

	if (!validator.isStrongPassword(newPassword)) {
		return res
			.status(400)
			.json({ message: 'Password is not strong enough.' });
	}

	// continue with find user and save...
};
if (!validator.isStrongPassword(password)) {
	setPasswordError(
		'Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.'
	);
	return;
}
<input
	type={showPassword ? 'text' : 'password'}
	className='w-full border rounded px-3 py-2'
	value={password}
	onChange={(e) => {
		setPassword(e.target.value);
		setPasswordError(''); // clear error on input
	}}
	required
/>


