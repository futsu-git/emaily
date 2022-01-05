# heroku の設定

1.ポート番号の動的な指定

```javascript:index.js
const PORT = process.env.PORT || 5000;
app.listen(PORT);
```

2.node のバージョン指定

```json:package.json
"engines":{
  "node":"16.x",
}
```

3.heroku 起動時の命令文（開始スクリプト）
procfile に書いておくか、package.json 内で設定する。

参考
https://devcenter.heroku.com/ja/articles/deploying-nodejs#specifying-a-start-script
