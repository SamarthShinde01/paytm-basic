import mongoose from "mongoose";

const accountSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		balance: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);

export default Account;
