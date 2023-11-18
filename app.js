import express from "express";
import cors from "cors";
import "dotenv/config";
import GlobalRoutes from "./messages/global/globalRoutes.js";
import PrivateRoutes from "./messages/private/privateRoutes.js";
import UserRoutes from "./users/userRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
GlobalRoutes(app);
PrivateRoutes(app);
UserRoutes(app);

app.listen(process.env.PORT || 4000);
