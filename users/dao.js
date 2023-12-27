import model from "./model.js";
export const createUser = (user) => model.create(user);
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) => model.findOne({ username: username });
export const findUserByCredentials = (username, password) => model.findOne({ username, password });
export const updateUser = (userId, user) => {return model.updateOne({ _id: userId }, { $set: user }); };
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
export const changeEmail = async (userId, newEmail) => {
    try {
        console.log("Cahnged Doc ",userId)
       const changedDocuemnt = await model.findOneAndUpdate({_id: userId}, { email: newEmail});
        return changedDocuemnt
    } catch (error) {
        console.error("Error in updating email:", error);
    }
};
