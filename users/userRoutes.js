import db from "../database/index.js";

function UserRoutes(app) {
	// Fetch all users
	app.get("/api/users", (req, res) => {
		const users = db.users;
		res.send(users);
	});
}

export default UserRoutes;
