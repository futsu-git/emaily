import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Header = ({ auth }) => {
	console.log(auth);

	const renderMenu = () => {
		switch (auth) {
			case null:
				return;
			case false:
				// Linkタグとaタグの使い分け
				// Linkタグ：React Routerによってレンダリングされるコンポーネントに遷移するとき
				// aタグ：全く異なるHTML文書に遷移するとき
				return (
					<li>
						<a href="/auth/google">Login with Google</a>
					</li>
				);
			default:
				return [
					<li key="0">Payments</li>,
					<li key="1" style={{ margin: "0 10px" }}>
						Credits:--
					</li>,
					<li key="2">
						<a href="/api/logout">Logout</a>
					</li>,
				];
		}
	};

	return (
		<nav style={{ paddingLeft: "10px" }}>
			<div className="nav-wrapper">
				<Link to={auth ? "/surveys" : "/"} className="brand-logo">
					Emaily
				</Link>
				<ul id="nav-mobile" className="right hide-on-med-and-down">
					{renderMenu()}
				</ul>
			</div>
		</nav>
	);
};

const mapStateToProps = ({ auth }) => {
	return { auth }; // { auth : auth }
};

export default connect(mapStateToProps)(Header);
