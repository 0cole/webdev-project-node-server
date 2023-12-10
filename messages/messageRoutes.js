import * as dao from "./dao.js";
function MessageRoutes(app) {
    const createMessage = async (req, res) => {
        const message = await dao.createMessage(req.body);
        res.json(message);
    };
    const deleteMessage = async (req, res) => {
        const status = await dao.deleteMessage(req.params.messageId);
        res.json(status);
    };
    const findAllMessages = async (req, res) => {
        const messages = await dao.findAllMessages();
        res.json(messages);
    };
    const findMessageById = async (req, res) => {
        const message = await dao.findMessageById(req.params.messageId);
        res.json(message);
    };
    const updateMessage = async (req, res) => {
        const { messageId } = req.params;
        const status = await dao.updateMessage(messageId, req.body);
        res.json(status);
    };
    app.post("/api/messages", createMessage);
    app.get("/api/messages", findAllMessages);
    app.get("/api/messages/:messageId", findMessageById);
    app.put("/api/messages/:messageId", updateMessage);
    app.delete("/api/messages/:messageId", deleteMessage);
}

export default MessageRoutes;