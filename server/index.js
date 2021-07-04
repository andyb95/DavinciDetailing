require('dotenv').config();
const cors = require('cors');
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const { resolve } = require('path');

const userCtrl = require('./UserController');
const { 
	CONNECTION_STRING,
	SERVER_PORT, 
	SESSION_SECRET,
	STATIC_DIR,
	STRIPE_SECRET_KEY,
	PAYMENT_METHOD_TYPES,
	PRICE,
	STRIPE_WEBHOOK_SECRET
} = process.env;

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

//stripe

// Ensure environment variables are set.
checkEnv();

//don't forget to config the secret key
const stripe = require('stripe')(STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27',
	appInfo: { // For sample support and debugging, not required for production:
	  name: "stripe-samples/accept-a-payment/prebuilt-checkout-page",
	  version: "0.0.1",
	  url: "https://github.com/stripe-samples"
	}
});

app.use(express.urlencoded());
app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith('/webhook')) {
        req.rawBody = buf.toString();
      }
    },
  })
);

app.get('/', (req, res) => {
	const path = resolve(STATIC_DIR);
	// const path = resolve(STATIC_DIR + '/index.html');
	res.sendFile(path);
});

// Fetch the Checkout Session to display the JSON result on the success page
app.get('/checkout-session', async (req, res) => {
	const { sessionId } = req.query;
	const session = await stripe.checkout.sessions.retrieve(sessionId);
	res.send(session);
});

app.post('/create-checkout-session', async (req, res) => {
	console.log({ res })
	const domainURL = 'http://localhost:4200'
  
	// The list of supported payment method types. We fetch this from the
	// environment variables in this sample. In practice, users often hard code a
	// list of strings for the payment method types they plan to support.
	const pmTypes = (PAYMENT_METHOD_TYPES || 'card').split(',').map((m) => m.trim());
  
	// Create new Checkout Session for the order
	// Other optional params include:
	// For full details see https://stripe.com/docs/api/checkout/sessions/create
	const session = await stripe.checkout.sessions.create({
	  payment_method_types: pmTypes,
	  mode: 'payment',
	  line_items: [{
		price: PRICE,
		quantity: 1,
	  }],
	  // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
	  success_url: `${domainURL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
	  cancel_url: `${domainURL}/canceled.html`,
	});
	// console.log({ session })
	console.log(session.url)
	res.send(session.url);
  });
  
  // Webhook handler for asynchronous events.
  app.post('/webhook', async (req, res) => {
	let event;
  
	// Check if webhook signing is configured.
	if (STRIPE_WEBHOOK_SECRET) {
	  // Retrieve the event by verifying the signature using the raw body and secret.
	  let signature = req.headers['stripe-signature'];
  
	  try {
		event = stripe.webhooks.constructEvent(
		  req.rawBody,
		  signature,
		  process.env.STRIPE_WEBHOOK_SECRET
		);
	  } catch (err) {
		console.log(`⚠️  Webhook signature verification failed.`);
		return res.sendStatus(400);
	  }
	} else {
	  // Webhook signing is recommended, but if the secret is not configured in `.env`,
	  // retrieve the event data directly from the request body.
	  event = req.body;
	}
  
	if (event.type === 'checkout.session.completed') {
	  console.log(`🔔  Payment received!`);
  
	  // Note: If you need access to the line items, for instance to
	  // automate fullfillment based on the the ID of the Price, you'll
	  // need to refetch the Checkout Session here, and expand the line items:
	  //
	  // const session = await stripe.checkout.sessions.retrieve(
	  //   'cs_test_KdjLtDPfAjT1gq374DMZ3rHmZ9OoSlGRhyz8yTypH76KpN4JXkQpD2G0',
	  //   {
	  //     expand: ['line_items'],
	  //   }
	  // );
	  //
	  // const lineItems = session.line_items;
	}
  
	res.sendStatus(200);
});

function checkEnv() {
	const price = process.env.PRICE;
	if(price === "price_12345" || !price) {
	  console.log("You must set a Price ID in the environment variables. Please see the README.");
	  process.exit(0);
	}
}

//middleware
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
