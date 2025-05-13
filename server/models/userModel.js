import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;
const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		// isAdmin: { type: Boolean, default: false },
		role: { type: String, enum: ['user', 'admin'], default: 'user' },
		resetToken: { type: String },
		resetTokenExpires: { type: Date },
	},
	{ timestamps: true }
);

//Hash Password before saving model. Must use this keyword and anonymous (not arrow ) function

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}
	this.password = await bcrypt.hash(this.password, 10);
});
const User = mongoose.model('User', userSchema);
export default User;
