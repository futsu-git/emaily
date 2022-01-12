import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Header = ({ auth }) => {
	const renderMenu = () => {
		switch (auth) {
			case null:
				return;
			case false:
				return (
					<li>
						<a href="/auth/google">Login with Google</a>
					</li>
				);
			default:
				return [
					<li key="0">
						<Link to="/payments">Add Credits</Link>
					</li>,
					<li key="1" style={{ margin: "0 10px" }}>
						Credits:{auth.credits}
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
