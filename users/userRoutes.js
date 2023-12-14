import * as dao from "./dao.js";
function UserRoutes(app) {
	const createUser = async (req, res) => {
		const user = await dao.createUser(req.body);
		res.json(user);
	};
	const deleteUser = async (req, res) => {
		const status = await dao.deleteUser(req.params.userId);
		res.json(status);
	};
	const findAllUsers = async (req, res) => {
		const users = await dao.findAllUsers();
		res.json(users);
	};
	const findUserById = async (req, res) => {
		const user = await dao.findUserById(req.params.userId);
		res.json(user);
	};
	const findUserByUsername = async (req, res) => {
		const user = await dao.findUserByUsername(req.params.username);
		res.json(user);
	};
	const findUserByFavoriteArtist = async (req, res) => {
		const user = await dao.findUserByFavoriteArtist(req.params.favoriteArtist);
		res.json(user);
	};
	const updateUser = async (req, res) => {
		const { userId } = req.params;
		const status = await dao.updateUser(userId, req.body);
		const currentUser = await dao.findUserById(userId);
		req.session["currentUser"] = currentUser;
		res.json(status);
	};
	const signup = async (req, res) => {
		const user = await dao.findUserByUsername(req.body.username);
		if (user) {
			res.status(400).json({ message: "Username already taken" });
		}
		const currentUser = await dao.createUser(req.body);
		req.session["currentUser"] = currentUser;
		res.json(currentUser);
	};
	const signin = async (req, res) => {
		try {
			const { username, password } = req.body;
			const currentUser = await dao.findUserByCredentials(username, password);

			if (!currentUser) {
				return res.status(401).json({ message: "Invalid credentials. Please check your username and password." });
			}

			req.session["currentUser"] = currentUser;
			res.json(currentUser);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal server error" });
		}
	};

	const signout = (req, res) => {
		req.session.destroy();
		res.json(200);
	};
	const account = async (req, res) => {
		res.json(req.session["currentUser"]);
	};

	const changeEmail = async (req, res) => {
		const { email } = req.body; // Extract email from the request body
		const { userId } = req.params;

		console.log("userID ",userId,req.params);
		const status = await dao.changeEmail(userId, email);
		console.log("status", status);
		const currentUser = await dao.findUserById(userId);
		req.session["currentUser"] = currentUser;
		res.json(status);
		
	  };


	app.post("/api/users/account", account);
	app.post("/api/users", createUser);
	app.get("/api/users/:favoriteArtist", findUserByFavoriteArtist);
	app.get("/api/users", findAllUsers);
	app.get("/api/users/:userId", findUserById);
	app.get("/api/users/username/:username", findUserByUsername);
	app.put("/api/users/:userId", updateUser);
	app.delete("/api/users/:userId", deleteUser);
	app.post("/api/users/signup", signup);
	app.post("/api/users/signin", signin);
	app.post("/api/users/signout", signout);
	app.post("/api/users/account", account);
	app.post("/api/users/changeEmail/:userId", changeEmail);
}
export default UserRoutes;
