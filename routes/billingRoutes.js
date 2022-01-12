const express = require("express");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const stripe = require("stripe")(keys.STRIPE_SECRET_KEY);
const requireLogin = require("../middlewares/requireLogin");

const User = mongoose.model("users");

const calculateOrderAmount = (items) => {
	// Replace this constant with a calculation of the order's amount
	// Calculate the order total on the server to prevent
	// people from directly manipulating the amount on the client
	return 500;
};

module.exports = (app) => {
	app.post(
		"/api/stripe/create-payment-intent",
		requireLogin,
		async (req, res) => {
			const { items } = req.body;

			// Create a PaymentIntent with the order amount and currency
			const paymentIntent = await stripe.paymentIntents.create({
				amount: calculateOrderAmount(items),
				currency: "usd",
				automatic_payment_methods: {
					enabled: true,
				},
			});

			req.user.client_secret = paymentIntent.client_secret;
			await req.user.save();

			res.send({
				clientSecret: paymentIntent.client_secret,
			});
		}
	);

	app.post(
		"/api/stripe/webhooks",
		express.raw({ type: "application/json" }),
		async (req, res) => {
			let event = req.body;
			switch (event.type) {
				case "payment_intent.succeeded":
					const paymentIntent = event.data.object;

					const user = await User.findOne({
						client_secret: event.data.object.client_secret,
					});
					user.client_secret = null;
					user.credits += 5;
					await user.save();

					console.log(
						`PaymentIntent for ${paymentIntent.amount} was successful!`
					);
					// Then define and call a method to handle the successful payment intent.
					// handlePaymentIntentSucceeded(paymentIntent);
					break;
				case "payment_method.attached":
					const paymentMethod = event.data.object;
					// Then define and call a method to handle the successful attachment of a PaymentMethod.
					// handlePaymentMethodAttached(paymentMethod);
					break;
				default:
					// Unexpected event type
					console.log(`Unhandled event type ${event.type}.`);
			}
			res.send();
		}
	);
};
