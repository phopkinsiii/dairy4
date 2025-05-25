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

// Add more validators as needed
