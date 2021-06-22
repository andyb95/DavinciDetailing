require('dotenv').config();
const cors = require('cors');
const express = require('express');
const massive = require('massive');
const session = require('express-session');

const userCtrl = require('./UserController');
const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET, STATIC_DIR } = process.env;

const app = express();

app.use(express.static(`${__dirname}/../build`))
app.use(express.static(STATIC_DIR));
app.use(express.json())
app.use(cors())
app.use(
	session({
		resave: true,
		saveUninitialized: true,
		cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
		secret: SESSION_SECRET,
	})
);

//users
app.post('/user/register', userCtrl.register);
app.post('/user/login', userCtrl.login);
app.put('/user/newAdmin/:email', userCtrl.newAdmin);
app.put('/user/email/:user_id', userCtrl.updateEmail);
// app.get('/user/getUser', userCtrl.getUser);
// app.get('/user/all', userCtrl.getAll);
app.delete('/user/logout', userCtrl.logout);

massive({
	connectionString: CONNECTION_STRING,
	ssl: { rejectUnauthorized: false },
}).then((db) => {
	app.set('db', db);
	console.log('database connected');
	app.listen(SERVER_PORT, () =>
		console.log(`listening on port ${SERVER_PORT}`)
	);
});
