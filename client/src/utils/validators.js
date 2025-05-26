export const validateContactForm = ({
	firstName,
	lastName,
	email,
	subject,
	message,
}) => {
	if (!firstName || !lastName || !email || !subject || !message) {
		return 'All fields except company are required.';
	}

	if (!email.includes('@')) {
		return 'A valid email is required.';
	}

	if (message.length < 10) {
		return 'Message must be at least 10 characters long.';
	}

	return null;
};

export const validateProductForm = ({
	name,
	description,
	priceOptions,
	category,
}) => {
	if (
		!name ||
		!description ||
		!category ||
		!Array.isArray(priceOptions) ||
		priceOptions.length === 0
	) {
		return 'Name, description, category, and at least one price option are required.';
	}

	for (let option of priceOptions) {
		if (!option.size || isNaN(option.price)) {
			return 'Each price option must include a size and a numeric price.';
		}
	}

	return null;
};

// Register field validators

export const validateRegisterData = ({ name, email, password }) => {
	if (!name.trim()) return 'Name is required.';
	if (!email.trim()) return 'Email is required.';
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
		return 'Please enter a valid email address.';
	if (!password.trim()) return 'Password is required.';
	if (password.length < 8) return 'Password must be at least 8 characters.';
	if (!/[A-Z]/.test(password))
		return 'Password must include at least one uppercase letter.';
	if (!/[a-z]/.test(password))
		return 'Password must include at least one lowercase letter.';
	if (!/[0-9]/.test(password))
		return 'Password must include at least one number.';
	if (!/[^A-Za-z0-9]/.test(password))
		return 'Password must include at least one special character.';

	return null; // ✅ Passed
};

export const validateLoginData = ({ email, password }) => {
	if (!email || !password) {
		return 'Email and password are required.';
	}
	// Simple email format check
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailPattern.test(email)) {
		return 'Please enter a valid email address.';
	}
	return null;
};


export const validateStrongPassword = (password) => {
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!pattern.test(password)) {
    return 'Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.';
  }
  return null;
};

export const getPasswordStrength = (password) => {
	const checks = {
		length: password.length >= 8,
		uppercase: /[A-Z]/.test(password),
		lowercase: /[a-z]/.test(password),
		number: /\d/.test(password),
		symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
	};

	const passed = Object.values(checks).filter(Boolean).length;
	let strength = '';
	if (passed <= 2) strength = 'Weak';
	else if (passed === 3 || passed === 4) strength = 'Moderate';
	else strength = 'Strong';

	return { checks, strength };
};

