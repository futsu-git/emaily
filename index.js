const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send({ hi: "there" });
});

// expressがnodeにポート5000番を監視させる
const PORT = process.env.PORT || 5000;
app.listen(PORT);
