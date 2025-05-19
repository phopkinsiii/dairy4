// @ts-nocheck
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import bcrypt from 'bcryptjs';
import {
	sendOrderConfirmationEmail,
	sendPasswordResetEmail,
} from '../utils/sendEmail.js';
import validator from 'validator'

const generateToken = (id, role) => {
	return jwt.sign({ id, role }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};

export const registerUser = async (req, res, next) => {
	try {
		const { name, email, password, role } = req.body;
		const userRole = role && role === 'admin' ? 'admin' : 'user';

		if (!name || !email || !password) {
			return res.status(400).json({ message: 'All fields are required.' });
		}

		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.status(400).json({ message: 'That email is already in use' });
		}
		const user = await User.create({ name, email, password, role: userRole });

		if (user) {
			const token = generateToken(user._id, user.role);
			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				token,
				createdAt: user.createdAt,
			});
		} else {
			res.status(400).json({ message: 'Invalid User Data' });
		}
	} catch (error) {
		next(error);
	}
};

// login user function

export const loginUser = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		//check if user exists
		const user = await User.findOne({ email });
		if (!user) {
			res.status(404).json({ message: 'User not found' });
		}
		//verify password
		console.log('🔍 Comparing passwords...');
		console.log('🟡 Input:', password);
		console.log('🔵 Stored:', user.password);
		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) {
			return res.status(400).json({ message: 'Incorrect Email or Password' });
		}
		//generate JWT token
		const token = jwt.sign(
			{ id: user._id, role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: '30d' }
		);
		//send response
		res.status(200).json({
			id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			token,
		});
	} catch (error) {
		next(error);
	}
};

export const requestPasswordReset = async (req, res) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		//Generate a reset token
		const resetToken = nanoid();
		user.resetToken = resetToken;
		user.resetTokenExpires = dayjs().add(1, 'hour').toDate(); //Token expires one hour
		await user.save();

		//Email Content
		const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
		const resetURL = `${frontendUrl}/reset-password?token=${resetToken}`;

		const message = `Hello ${user.name} \n\nYou requested a password reset. Click the link below to reset your password:\n\n${resetURL}\n\nIf you did not request this, please contact us immediately.`;

		//Send the email.
		//debug log
		console.log('➡️ Preparing to send password reset email...');
		console.log('🔍 User object:', user);

		await sendPasswordResetEmail({
			to: user.email,
			name: user.name,
			resetURL,
		});

		console.log('✅ Password reset email function executed');
		res
			.status(200)
			.json({ message: 'Password reset link sent to your email.' });
	} catch (error) {
		res.status(500).json({ message: 'Server Error', error: error.message });
	}
};

//Reset password
export const resetPassword = async (req, res) => {
	const { resetToken, newPassword } = req.body;
	if (!validator.isStrongPassword(newPassword)) {
		return res
			.status(400)
			.json({ message: 'Password is not strong enough.' });
	}
	try {
		const user = await User.findOne({
			resetToken,
			resetTokenExpires: { $gt: new Date() },
		});

		if (!user) {
			return res
				.status(400)
				.json({ message: 'Invalid or expired reset request' });
		}

		// ✅ Assign plain text password — schema will hash it
		user.password = newPassword;

		// ✅ Clear the reset token fields
		user.resetToken = undefined;
		user.resetTokenExpires = undefined;

		await user.save(); // ✅ This will trigger the pre('save') hook to hash password

		res.status(200).json({ message: 'Password updated successfully.' });
	} catch (error) {
		res.status(500).json({ message: 'Server Error', error: error.message });
	}
};

//set Admin role
export const setAdminRole = async (req, res, next) => {
	const { userId } = req.params; //Id of the user to update
	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		user.isAdmin = true;
		await user.save();
		res
			.status(200)
			.json({ message: 'User has been granted administrative privileges.' });
	} catch (error) {
		next(error);
	}
};

export const getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find().select('-password'); //Exclude passwords from return
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: 'Server Error', error: error.message });
	}
};
