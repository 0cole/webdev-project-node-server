import model from "./model.js";
export const findAllLikes = () => model.find();
export const createUserLikesAlbum = (userId, albumId) =>
  model.create({ userId: userId, albumId: albumId });
export const findAlbumsUserLikes = (userId) => model.find({ userId: userId });
export const findUsersWhoLikeAlbum = (albumId) =>
  model.find({ albumId: albumId });