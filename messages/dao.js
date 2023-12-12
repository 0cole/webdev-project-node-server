import model from "./model.js";
export const createMessage = (message) => model.create(message);
export const findAllMessages = () => model.find();
export const findMessageById = (messageId) => model.findById(messageId);
export const deleteMessage = (messageId) => model.deleteOne({ _id: messageId });
