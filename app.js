import express from "express";
import session from "express-session";
import cors from "cors";
import "dotenv/config";
import GlobalRoutes from "./messages/global/globalRoutes.js";
import PrivateRoutes from "./messages/private/privateRoutes.js";
import MessageRoutes from "./messages/messageRoutes.js";
import UserRoutes from "./users/userRoutes.js";
import mongoose from "mongoose";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/project";
mongoose.connect(
	"mongodb+srv://user:supersecretpassword@cluster0.maihowa.mongodb.net/project?retryWrites=true&w=majority"
);

const app = express();

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

const sessionOptions = {
	secret: "any string",
	resave: false,
	saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
	sessionOptions.proxy = true;
	sessionOptions.cookie = {
		sameSite: "none",
		secure: true,
	};
}
app.use(session(sessionOptions));

app.use(express.json());
GlobalRoutes(app);
PrivateRoutes(app);
MessageRoutes(app);
UserRoutes(app);

app.listen(process.env.PORT || 4000);
