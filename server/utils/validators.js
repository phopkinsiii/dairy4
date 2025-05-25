// utils/validators.js
import validator from 'validator';

// ✅ Validate Email
export const validateEmail = (email) => {
	if (!email || !validator.isEmail(email)) {
		return 'A valid email is required.';
	}
	return null;
};

// ✅ Validate Password Strength
export const validatePassword = (password) => {
	if (!password || !validator.isStrongPassword(password)) {
		return 'Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol.';
	}
	return null;
};


export const validateContactForm = ({ firstName, lastName, email, subject, message }) => {
	if (!firstName || validator.isEmpty(firstName.trim())) {
		return 'First name is required.';
	}
	if (!lastName || validator.isEmpty(lastName.trim())) {
		return 'Last name is required.';
	}
	if (!email || !validator.isEmail(email)) {
		return 'A valid email address is required.';
	}
	if (!subject || validator.isEmpty(subject.trim())) {
		return 'Subject is required.';
	}
	if (!message || validator.isEmpty(message.trim())) {
		return 'Message is required.';
	}
	if (!validator.isLength(message, { min: 10 })) {
		return 'Message must be at least 10 characters long.';
	}
	return null;
};


// ✅ Validate Registration Fields
export const validateRegisterData = ({ name, email, password }) => {
	if (!name || !email || !password) {
		return 'All fields are required.';
	}
	const emailError = validateEmail(email);
	if (emailError) return emailError;
	const passwordError = validatePassword(password);
	if (passwordError) return passwordError;
	return null;
};

// ✅ Validate Login Fields
export const validateLoginData = ({ email, password }) => {
	if (!email || !password) {
		return 'Email and password are required.';
	}
	return validateEmail(email); // returns null or error message
};

// ✅ Validate Password Reset
export const validateResetPassword = ({ resetToken, newPassword }) => {
	if (!resetToken || !newPassword) {
		return 'Reset token and new password are required.';
	}
	const passwordError = validatePassword(newPassword);
	if (passwordError) return passwordError;
	return null;
};

// ✅ Validate Product Fields
export const validateProductData = ({ name, description, priceOptions, category }) => {
	if (!name || !description || !priceOptions || !Array.isArray(priceOptions) || priceOptions.length === 0) {
		return 'Name, description, category, and at least one price option are required.';
	}

	if (!category) {
		return 'Product category is required.';
	}

	for (let option of priceOptions) {
		if (!option.size || typeof option.price !== 'number') {
			return 'Each price option must include a size and a numeric price.';
		}
	}

	return null;
};

