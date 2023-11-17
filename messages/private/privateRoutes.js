import db from "../../database/index.js";

function PrivateRoutes(app) {
	// Fetch all messages between two users
	app.get("/api/messages/:sender/:receiver", (req, res) => {
		const { sender, receiver } = req.params;
		const messages = db.messages.filter(
			(c) => (c.sender === sender && c.receiver === receiver) || (c.sender === receiver && c.receiver === sender)
		);
		res.send(messages);
	});
	// Create message
	app.post("/api/messages", (req, res) => {
		const message = { ...req.body, _id: new Date().getTime().toString() };
		db.messages.push(message);
		res.send(message);
	});
	// Delete message
	app.delete("/api/messages/:id", (req, res) => {
		const { id } = req.params;
		db.messages = db.messages.filter((c) => c._id !== id);
		res.sendStatus(204);
	});
	// Update message
	app.put("/api/messages/:id", (req, res) => {
		const { id } = req.params;
		const message = req.body;
		db.messages = db.messages.map((c) => (c._id === id ? { ...c, ...message } : c));
		res.sendStatus(204);
	});
}

export default PrivateRoutes;
