import mongoose from 'mongoose';

const goatSchema = new mongoose.Schema(
	{
		nickname: { type: String, required: true },
		registeredName: { type: String },
		dob: { type: Date, required: true },
		adgaId: { type: String, required: true },
		awards: [{ type: String }],
		pedigree: {
			sire: { type: String },
			dam: { type: String },
			siresSire: { type: String },
			siresDam: { type: String },
			damsSire: { type: String },
			damsDam: { type: String },
		},
		dnaConfirmed: { type: Boolean, default: false },
		forSale: { type: Boolean, default: false },
		price: { type: Number },
		additionalInfo: { type: String },
		image: { type: String },
	},
	{ timestamps: true }
);

const Goat = mongoose.model('Goat', goatSchema);
export default Goat;
