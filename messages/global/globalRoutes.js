import db from "../../database/index.js";

function GlobalRoutes(app) {
	// Fetch all messages
	app.get("/api/messages/global", (req, res) => {
		const messages = db.messages;
		res.send(messages);
	});
	// Create message
	app.post("/api/messages/global", (req, res) => {
		const message = { ...req.body, _id: parseInt(new Date().getTime().toString()) };
		db.messages.push(message);
		res.send(message);
	});
	// Delete message
	app.delete("/api/messages/global/:id", (req, res) => {
		const { id } = req.params;
		db.messages = db.messages.filter((c) => c._id !== id);
		res.sendStatus(204);
	});
	// Update message
	app.put("/api/messages/global/:id", (req, res) => {
		const { id } = req.params;
		const message = req.body;
		db.messages = db.messages.map((c) => (c._id === id ? { ...c, ...message } : c));
		res.sendStatus(204);
	});
}

export default GlobalRoutes;
