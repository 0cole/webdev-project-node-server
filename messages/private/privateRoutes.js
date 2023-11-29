import db from "../../database/index.js";

function PrivateRoutes(app) {
	// Fetch all messages between two users
	app.get("/api/messages/private/:sender/:receiver", (req, res) => {
		const sender = Number(req.params.sender);
		const receiver = Number(req.params.receiver);
		const messages = db.privateMessages.filter(
			(c) => (c.toUid === sender && c.fromUid === receiver) || (c.toUid === receiver && c.fromUid === sender)
		);
		res.send(messages);
	});
	// Create message
	app.post("/api/messages/private/:sender/:receiver", (req, res) => {
		const sender = Number(req.params.sender);
		const receiver = Number(req.params.receiver);
		const newMessage = req.body;

		if (!newMessage || !newMessage.input || typeof newMessage._id !== "number") {
			return res.status(400).json({ error: "Invalid message format" });
		}

		// Add the new message to the database (replace this with your storage mechanism)
		const message = {
			input: newMessage.input,
			fromUid: sender,
			toUid: receiver,
			_id: new Date().getTime(), // or generate a unique ID
		};

		db.privateMessages.push(message); // Assuming db is your data storage

		res.status(201).json(message);
	});
	// Delete message
	app.delete("/api/messages/private/:id", (req, res) => {
		const { id } = req.params;
		db.messages = db.messages.filter((c) => c._id !== id);
		res.sendStatus(204);
	});
	// Update message
	app.put("/api/messages/private/:id", (req, res) => {
		const { id } = req.params;
		const message = req.body;
		db.messages = db.messages.map((c) => (c._id === id ? { ...c, ...message } : c));
		res.sendStatus(204);
	});
}

export default PrivateRoutes;
