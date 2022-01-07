// create-react-appがsetupProxy.jsというファイル名を自動的に見つけ出して読み込むため、import不要
// production(heroku等で稼働するもの)ではcreate-react-appサーバは存在しないため、このファイルは読み込まれないconst { createProxyMiddleware } = require("http-proxy-middleware");
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = (app) => {
	app.use(
		["/api", "/auth/google"],
		createProxyMiddleware({
			target: "http://localhost:5000",
		})
	);
};
