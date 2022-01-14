import { useEffect } from "react";
import { connect } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { fetchSurveys } from "../../actions";

ChartJS.register(ArcElement, Tooltip, Legend);

const SurveyList = (props) => {
	useEffect(() => {
		props.fetchSurveys();
	}, []);

	const lists = () => {
		if (!props.surveys) return <></>;
		return props.surveys.reverse().map((survey) => {
			const data = {
				labels: ["yes", "no"],
				datasets: [
					{
						data: [survey.yes, survey.no],
						backgroundColor: [
							"rgba(255, 99, 132, 0.5)",
							"rgba(54, 162, 235, 0.5)",
						],
						borderWidth: 1,
					},
				],
			};

			return (
				<div className="card" key={survey._id}>
					<div className="card-content">
						<span className="card-title">{survey.title}</span>
						<p>{survey.body}</p>
						<div
							style={{
								maxWidth: "150px",
								marginLeft: "auto",
								marginRight: "auto",
							}}
						>
							{survey.yes + survey.no > 0 ? <Pie data={data} /> : <></>}
						</div>
						<p style={{ textAlign: "right" }}>
							{survey.lastResponded
								? `last responded: ${new Date(
										survey.lastResponded
								  ).toLocaleDateString()}`
								: ""}
						</p>
					</div>
					<div className="card-action">
						<a>YES:{survey.yes}</a>
						<a>NO:{survey.no}</a>
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
