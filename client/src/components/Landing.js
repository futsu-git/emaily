const Landing = () => {
	return (
		<>
			<div style={{ textAlign: "center" }}>
				<h1>Emaily</h1>
				顧客へ調査メールを一斉送信してフィードバックを集めます。
				<div className="row">
					<div className="col s12">
						<div className="col s4" style={{ padding: "10px" }}>
							<h4>Easy!</h4>
							<i
								className="large material-icons"
								style={{ color: "limegreen" }}
							>
								contact_mail
							</i>
							<p style={{ textAlign: "left" }}>
								アプリから誰でも簡単にメールを一括送信できます。
							</p>
						</div>
						<div className="col s4" style={{ padding: "10px" }}>
							<h4>Fast!</h4>
							<i className="large material-icons" style={{ color: "tomato" }}>
								compare_arrows
							</i>
							<p>
								メールはすぐに送信され、スピーディにフィードバックが得られます。
							</p>
						</div>
						<div className="col s4" style={{ padding: "10px" }}>
							<h4>Functional!</h4>
							<i
								className="large material-icons"
								style={{ color: "deepskyblue" }}
							>
								insert_chart
							</i>
							<p>
								回答の集計も自動的に行われ、集計状況はグラフで可視化されます。
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Landing;
