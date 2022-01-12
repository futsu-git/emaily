import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import * as actions from "../actions";
import "./Payments.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payments = (props) => {
	const [clientSecret, setClientSecret] = useState("");

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		fetch("/api/stripe/create-payment-intent", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ items: [{ id: "five-emailyService" }] }),
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret));
	}, []);

	const appearance = {
		theme: "stripe",
	};
	const options = {
		clientSecret,
		appearance,
	};

	return (
		<div
			className="Payments"
			style={{ width: "100%", display: "flex", justifyContent: "center" }}
		>
			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					<CheckoutForm />
				</Elements>
			)}
		</div>
	);
};

export default connect(null, actions)(Payments);
