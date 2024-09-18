import mongoose from "mongoose";

const userSchema = mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Account" }],
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
