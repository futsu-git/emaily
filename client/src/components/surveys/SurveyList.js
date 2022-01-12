import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

const SurveyList = (props) => {
	useEffect(() => {
		props.fetchSurveys();
	}, []);

	const lists = () => {
		if (!props.surveys) return <></>;
		return props.surveys.reverse().map((survey) => {
			return (
				<div className="card" key={survey._id}>
					<div className="card-content">
						<span className="card-title">{survey.title}</span>
						<p>{survey.body}</p>
						<p className="right">
							Sent on: {new Date(survey.dateSent).toLocaleDateString()}
						</p>
					</div>
					<div className="card-action">
						<a>yes:{survey.yes}</a>
						<a>no:{survey.no}</a>
					</div>
				</div>
			);
		});
	};

	return <div>{lists()}</div>;
};

const mapStateToProps = ({ surveys }) => {
	return { surveys };
};

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
