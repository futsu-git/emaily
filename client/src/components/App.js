import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./SurveyNew";

const App = (props) => {
	useEffect(() => {
		props.fetchUser();
	}, []);

	return (
		<div>
			<BrowserRouter>
				<Header />
				<div className="container">
					<Routes>
						<Route path="/" element={<Landing />} />
						<Route path="/surveys" element={<Dashboard />} />
						<Route path="/surveys/new" element={<SurveyNew />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
};

export default connect(null, actions)(App);
