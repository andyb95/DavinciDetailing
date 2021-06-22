const bcrypt = require('bcrypt');

module.exports = {
	register: async (req, res) => {
		try {
			const db = req.app.get('db');
			const { email, password } = req.body;
			const existingUser = await db.check_user(email);
	
			if (existingUser[0]) {
				return res
					.status(400)
					.send('Email already associated with a user account');
			}
	
			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(password, salt);
	
			const newUser = await db.create_user(email, hash, false);
	
			req.session.user = {
				userId: newUser[0].user_id,
				email: newUser[0].email,
				isAdmin: false,
			};
	
			res.status(200).send(req.session.user);
		}
		catch (e) {
			console.error('Could not register user')
		}
	},

	login: async (req, res) => {
		const db = req.app.get('db');
		const { email, password } = req.body;

		const user = await db.check_user(email);
		if (!user[0]) {
			return res.status(400).send('Incorrect login credentials');
		} else {
			const authenticated = bcrypt.compareSync(password, user[0].password);
			if (authenticated) {
				req.session.user = {
					userId: user[0].user_id,
					email: user[0].email,
					isAdmin: user[0].is_admin,
				};
				res.status(200).send(req.session.user);
			} else {
				res.status(400).send('incorrect email or password');
			}
		}
	},

	// getAll: (req, res) => {
	// 	const db = req.app.get('db');

	// 	db.get_all_users()
	// 		.then((users) => res.status(200).send(users))
	// 		.catch((err) => res.status(500).send(err));
	// },

	// getUser: (req, res) => {
	// 	if (req && req.session && req.session.user) {
	// 		return res.status(200).send(req.session.user);
	// 	}
	// },

	newAdmin: async (req, res) => {
		const db = req.app.get('db');
		const { email } = req.params;

		const newAdmin = await db.new_admin(email);
		if (newAdmin) {
			res.status(200).send(newAdmin);
		} else {
			res.status(500).send('err');
		}
	},

	updateEmail: async (req, res) => {
		const db = req.app.get('db');
		const { email } = req.body;
		const { user_id } = req.params;

		const updateEmail = await db.update_email([user_id, email]);

		req.session.user = {
			email: updateEmail[0].email,
			picture: updateEmail[0].picture,
			userId: updateEmail[0].user_id,
			isAdmin: updateEmail[0].is_admin,
		};
		res.status(200).send(req.session.user);
	},

	logout: (req, res) => {
		req.session.destroy();
		res.sendStatus(200);
	},
};
