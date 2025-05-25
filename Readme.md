const handleSubmit = async (e) => {
	e.preventDefault();

	const formData = { firstName, lastName, email, company, subject, message };

	// ✅ Run frontend validation
	const error = validateContactForm(formData);
	if (error) {
		dispatch({ type: 'SUBMIT_FAILURE', payload: error });
		return;
	}

	// Proceed to send to backend
	await submitContactForm(formData);
};
