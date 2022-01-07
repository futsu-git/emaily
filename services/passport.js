const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

// 引数が1つだけ -> 第1引数で指定したモデルクラスを読み込む
// 引数が2つ -> 第1引数で指定したモデルクラスに第2引数のスキーマを設定する
const User = mongoose.model("users");

// serializeUser関数...DBに登録したユーザー情報からユーザーを識別するためのidをユーザーのcookieに組み込む関数
// ログイン処理の中で、ユーザーの情報(profile等)が取得できたとき、以下のコールバック関数が自動で呼ばれる
// コールバック関数の第1引数のuserとは、DBに登録したユーザー情報（passport.use()内のdone()の第2引数がそのまま第1引数にくる）
passport.serializeUser((user, done) => {
	// passport.jsのdone関数は、何かしらの一連の処理が完了したときに呼ばれるコールバック関数
	// user.id はデータベースの中で作成されるユニークなidである _id.$oid にあたる。user.idは _id.$oid のエイリアス。
	done(null, user.id);
});

// deserializeUser関数...ユーザーのcookieに組み込まれたidを基にユーザー情報を取得する関数
// ユーザーからリクエストがある度に以下のコールバック関数が自動で呼ばれる。第1引数のidとは、serializeUser()でユーザーのcookieに組み込んだuser.idである。つまり、ユーザーは自分のcookie情報をリクエスト時に渡しているということ。
// done()の第2引数がreq.userとしてreqオブジェクトに追加される
passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.GOOGLE_CLIENT_ID,
			clientSecret: keys.GOOGLE_CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
			proxy: true, // ブラウザがこちらのサーバーにリクエストをするときにHeroku proxyを介しており、デフォルトでは何らかのプロキシを経由するとpassportはそれをむやみに信頼したくないのでhttps->httpに変えてしまう。そこで、proxy:trueとすることでプロキシを信頼するようにでき、httpsのままになる。
		},
		// 第2引数に指定した関数は、ユーザーがGoogleのログイン画面からアプリへリダイレクトされたときに実行される
		async (accessToken, refreshToken, profile, done) => {
			// console.log({ accessToken, refreshToken, profile });
			const existingUser = await User.findOne({ googleId: profile.id });
			if (existingUser) {
				return done(null, existingUser);
			}
			const user = await new User({ googleId: profile.id }).save();
			done(null, user);
		}
	)
);
