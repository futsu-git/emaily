import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as actions from "../../actions";

const labels = {
	title: "Email Title",
	subject: "Email Subject",
	body: "Email Body Text",
	recipients: "Recipients' Addresses",
};

const SurveyNew = (props) => {
	const [isReview, setIsReview] = useState(false);
	const [formData, setFormData] = useState({});
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		setFormData(data);
		setIsReview(true);
	};

	useEffect(() => {
		console.log(errors);
	});

	const SurveyForm = () => {
		return (
			<div className="row">
				<form
					id="survey_form"
					className="col s12"
					onSubmit={handleSubmit(onSubmit)}
				>
					<h4>Survey Form</h4>
					<div className="row">
						<div className="input-field col s12">
							{labels.title}
							<input
								placeholder="ex) Survey #001"
								defaultValue=""
								className="validate"
								{...register("title", { required: true })}
							/>
							{errors.title && (
								<span style={{ color: "red" }}>This field is required</span>
							)}
						</div>
					</div>

					<div className="row">
						<div className="input-field col s12">
							{labels.subject}
							<input
								placeholder="ex) Please give us Feedback!"
								defaultValue=""
								className="validate"
								{...register("subject", { required: true })}
							/>
							{errors.subject && (
								<span style={{ color: "red" }}>This field is required</span>
							)}
						</div>
					</div>

					<div className="row">
						<div className="input-field col s12">
							{labels.body}
							<input
								placeholder="ex) We would love to hear if you are enjoying our services!"
								defaultValue=""
								className="validate"
								{...register("body", { required: true })}
							/>
							{errors.body && (
								<span style={{ color: "red" }}>This field is required</span>
							)}
						</div>
					</div>

					<div className="row">
						<div className="input-field col s12">
							{labels.recipients}
							<input
								placeholder="bob@example.com,joe@example.com,becky@example.com,..."
								defaultValue=""
								className="validate"
								{...register("recipients", {
									required: true,
									validate: (emails) => {
										const emailArray = emails.split(",");
										const regex =
											/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
										for (let i = 0; i < emailArray.length; i++) {
											if (!regex.test(emailArray[i].trim())) {
												return false;
											}
										}
									},
								})}
							/>
							{(errors.recipients?.type === "required" && (
								<span style={{ color: "red" }}>This field is required</span>
							)) ||
								(errors.recipients?.type === "validate" && (
									<span style={{ color: "red" }}>
										There are some wrong style
									</span>
								))}
						</div>
					</div>

					<Link to="/surveys" className="left floated red btn">
						Cancel
					</Link>

					<input
						className="right floated btn"
						id="survey_form"
						type="submit"
						value="Next"
						style={{ marginBottom: "10px" }}
					/>
				</form>
			</div>
		);
	};

	const SurveyFormReview = () => {
		return (
			<div>
				<div>
					<h4>Survey Form Confirmation</h4>
					<h5>{labels.title}</h5>
					<p>{formData.title}</p>
					<h5>{labels.subject}</h5>
					<p>{formData.subject}</p>
					<h5>{labels.body}</h5>
					<p>{formData.body}</p>
					<h5>{labels.recipients}</h5>
					<p>{formData.recipients}</p>
				</div>
				<a className="left floated btn" onClick={() => setIsReview(false)}>
					Back
				</a>
				<a
					className="right floated blue btn"
					onClick={() => props.submitSurvey(formData, navigate)}
				>
					Send<i className="material-icons right">send</i>
				</a>
			</div>
		);
	};

	return isReview ? <SurveyFormReview /> : <SurveyForm />;
};

export default connect(null, actions)(SurveyNew);
