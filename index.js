const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

mongoose.connect(keys.MONGO_URI);

require("./models/User");

require("./services/passport");

const app = express();
app.use(express.json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30日*24時間*60分*60秒*1000ミリ秒 -> cookieは30日間存続
		keys: [keys.COOKIE_KEY],
	})
);
// Connect もしくは Express を基盤にしたアプリケーションでは、passport.initialize() を用いて Passport の初期化を行うことが必要になります。 アプリケーションでログイン後のセッション管理を行う場合には、passport.session() の記述も必要になります。
// https://knimon-software.github.io/www.passportjs.org/guide/configure/
app.use(passport.initialize());
app.use(passport.session());

// 各routeの読み込み
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

// Herokuは自動的にprocess.env.NODE_ENVを"production"に設定する
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

// expressがnodeにポート5000番を監視させる
const PORT = process.env.PORT || 5000;
app.listen(PORT);
