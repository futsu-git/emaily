const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
});

// 引数が2つ -> 第1引数で指定したモデルクラスに第2引数のスキーマを設定する
mongoose.model("users", userSchema);
