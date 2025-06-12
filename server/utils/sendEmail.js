// @ts-nocheck
import dotenv from 'dotenv-flow';
dotenv.config({ node_env: process.env.NODE_ENV });

import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
	console.warn('⚠️ RESEND_API_KEY is missing. Emails will not be sent.');
}

// Utility to safely create a Resend instance
const getResendInstance = () => {
	if (!resendApiKey) throw new Error('RESEND_API_KEY is not set');
	return new Resend(resendApiKey);
};

// ===============================
// ✅ Send Order Confirmation Email
// ===============================
export const sendOrderConfirmationEmail = async ({
	to,
	subject,
	name,
	cartItems = [],
	pickupName,
	pickupLocation,
	pickupTime,
	isAdminCopy = false,
}) => {
	try {
		const resend = getResendInstance();

		const html = `
			<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
				<h2 style="color: #2c5282;">${
					isAdminCopy ? 'New Order Received' : 'Thank You for Your Order!'
				}</h2>
				<p>${
					isAdminCopy
						? `A new order has been placed by <strong>${name}</strong>.`
						: `Hi <strong>${name}</strong>, thank you for placing your order with Blueberry Dairy!`
				}</p>
				<h3>Pickup Details</h3>
				<ul>
					<li><strong>Pickup Name:</strong> ${pickupName}</li>
					<li><strong>Location:</strong> ${pickupLocation}</li>
					<li><strong>Time:</strong> ${pickupTime}</li>
				</ul>
				<h3>Items</h3>
				<ul>
					${
						Array.isArray(cartItems) && cartItems.length > 0
							? cartItems
									.map(
										(item) =>
											`<li>${item.quantity || 1} × ${item.name} — $${Number(
												item.price
											).toFixed(2)}</li>`
									)
									.join('')
							: '<li>No items listed.</li>'
					}
				</ul>
				${
					!isAdminCopy
						? `<p>We’ll see you soon! If you have questions, reply to this email.</p>`
						: ''
				}
				<p style="margin-top: 2rem; font-size: 0.9em; color: #666;">
					${isAdminCopy ? 'Internal Notification' : 'Blueberry Dairy'}
				</p>
			</div>
		`;

		const response = await resend.emails.send({
			from: 'Blueberry Dairy <orders@blueberrydairy.com>',
			to,
			subject,
			html,
		});

		console.log(`📧 Email sent to ${to}:`, response);
		return response;
	} catch (error) {
		console.error(`❌ Failed to send email to ${to}:`, error.message);
		throw new Error(`Email failed: ${error.message}`);
	}
};

// =========================
// ✅ Send Password Reset Email
// =========================
export const sendPasswordResetEmail = async ({ to, name, resetURL }) => {
	try {
		const resend = getResendInstance();

		const subject = 'Reset Your Password - Blueberry Dairy';
		const htmlContent = `
			<div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
				<h2>Hello ${name},</h2>
				<p>You requested a password reset for your Blueberry Dairy account.</p>
				<p><a href="${resetURL}" style="padding: 12px 24px; background-color: #4f46e5; color: #ffffff; text-decoration: none; border-radius: 6px;">Reset Password</a></p>
				<p>If the button doesn't work, paste this link into your browser:</p>
				<p style="word-break: break-all;">${resetURL}</p>
				<hr />
				<p style="font-size: 0.9em; color: #555;">If you didn’t request this, you can safely ignore this email.</p>
			</div>
		`;

		await resend.emails.send({
			from: 'Blueberry Dairy <noreply@blueberrydairy.com>',
			to,
			subject,
			html: htmlContent,
		});

		console.log(`✅ Password reset email sent to ${to}`);
	} catch (error) {
		console.error('❌ Failed to send password reset email:', error.message);
		throw new Error('Email sending failed');
	}
};

// =========================
// ✅ Send Contact Form Email
// =========================
export const sendContactEmail = async ({
	name,
	email,
	subject,
	message,
	company,
}) => {
	try {
		const resend = getResendInstance();

		const adminHtml = `
			<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
				<h2 style="color: #2c5282;">New Contact Message</h2>
				<p><strong>Name:</strong> ${name}</p>
				<p><strong>Email:</strong> ${email}</p>
				${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
				<p><strong>Subject:</strong> ${subject}</p>
				<p><strong>Message:</strong></p>
				<p style="white-space: pre-wrap;">${message}</p>
			</div>
		`;

		const autoReplyHtml = `
			<div style="font-family: Georgia, serif; max-width: 600px; margin: auto; color: #3d3d3d; background: #f8f5f2; border: 1px solid #ddd; padding: 24px; border-radius: 8px;">
				<h2 style="color: #2e4a28;">Thank you for reaching out to Blueberry Dairy!</h2>
				<p>Hi <strong>${name}</strong>,</p>
				<p>We’ve received your message and will get back to you shortly.</p>
				<p>Here’s a copy of your submission:</p>
				<div style="background: #fff; padding: 16px; border: 1px solid #ccc; border-radius: 6px;">
					<p><strong>Subject:</strong> ${subject}</p>
					<p><strong>Message:</strong><br/>${message}</p>
				</div>
				<p>With gratitude,<br/><strong>Blueberry Dairy</strong></p>
			</div>
		`;

		const adminResponse = await resend.emails.send({
			from: 'Blueberry Dairy <contact@blueberrydairy.com>',
			to: process.env.ADMIN_EMAIL,
			reply_to: email,
			subject: `Contact Form: ${subject}`,
			html: adminHtml,
		});

		const userResponse = await resend.emails.send({
			from: 'Blueberry Dairy <contact@blueberrydairy.com>',
			to: email,
			subject: 'We’ve received your message',
			html: autoReplyHtml,
		});

		console.log(
			'📧 Contact email sent to admin and confirmation sent to customer'
		);
		return { adminResponse, userResponse };
	} catch (error) {
		console.error('❌ Failed to send contact emails:', error.message);
		throw new Error(`Failed to send contact emails: ${error.message}`);
	}
};
