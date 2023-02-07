const express = require("express");
const path = require("path");

const app = express();

// 미들웨어 지정(?) 아마도 서버의 static 폴더안에 js나 css 파일을 저장 해 놓는 곳이라 추측 -> 향후 보강

app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

app.get("/*", (req, res) => {
  // 어떤 경로로 파일을 보내든 index로 redirect
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"))
})

app.listen(process.env.PORT || 5000, () => console.log("Server is running..."));