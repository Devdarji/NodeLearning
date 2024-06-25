const express = require("express");
const path = require("path");

const friendRouter = require("./router/friends.router");
const messageRouter = require("./router/messages.router");

const app = express();

const PORT = 3000;

app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(
    `Method : ${req.method} , Url : ${req.baseUrl}${req.url}, Time : ${delta}ms`
  );
});

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use("/site", express.static(path.join(__dirname, "public")));
app.use(express.json());



app.get("/", (req, res) => {
  res.render("index", {
    title: "My Friend is Very Clever",
    caption: "The India is Very Amazing",
  });
});

app.use("/friends", friendRouter);
app.use("/messages", messageRouter);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
