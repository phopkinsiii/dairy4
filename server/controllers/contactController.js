import Contact from '../models/contactModel.js';

export const createContact = async (req, res) => {
	try {
		const { firstName, lastName, email, company, subject, message, createdAt } =
			req.body;

		if (!firstName || !lastName || !email || !subject || !message) {
			return res.status(400).json({ message: 'Please enter required fields' });
		}

		const newContact = new Contact({
			firstName,
			lastName,
			email,
			subject,
			message,
		});
		await newContact.save();
		res
			.status(201)
			.json({ message: 'Contact form submitted!', contact: newContact });
	} catch (error) {
		console.error('Error creating contact: ', error);
		res.status(500).json({ message: 'Server Error. Please try again later.' });
	}
};

export const getAllContacts = async (req, res) => {
	try {
		const contacts = await Contact.find();
		return res.status(200).json(contacts);
	} catch (error) {
		console.error('Error fetching contacts:', error);
		res.status(500).json({ message: 'Server Error while fetching contacts' });
	}
};

export const getSingleContact = async (req, res) => {
	try {
		const { id } = req.params;
		const contact = await Contact.findById(id);
		if (!contact) {
			return res.status(404).json({ message: 'Contact Not Found' });
		}
		res.status(200).json(contact);
	} catch (error) {
		console.error('Error fetching contact:', error);
		res.status(500).json({ message: 'Server error when fetching contact' });
	}
};

//Delete a contact by Id
export const deleteContact = async (req, res) => {
	try {
		const { id } = req.params.id;
		const contact = await Contact.findByIdAndDelete(id);
		if (!contact) {
			return res.status(404).json({ message: 'Contact not found' });
		}
		res.status(200).json({ message: 'Contact deleted.' });
	} catch (error) {
		console.error('Error deleting contact:', error);
		res.status(500).json({ message: 'Server Error Deleting Contact' });
	}
};
