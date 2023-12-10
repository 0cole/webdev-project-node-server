import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true },
		input: { type: String, required: true },
		date: { type: String, required: true },
	},
	{ collection: "messages" }
);

export default messageSchema;
