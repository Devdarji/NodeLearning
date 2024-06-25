const http = require("http");

const PORT = 3001;

const server = http.createServer();

const friends = [
  {
    id: 0,
    name: "Node learner",
  },
  {
    id: 1,
    name: "Python learner",
  },
  {
    id: 2,
    name: "Javascript learner",
  },
];

server.on("request", (req, res) => {
  let items = req.url.split("/");

  if (req.method === "POST" && items[1] === "friends") {
    req.on("data", (data) => {
      const friend = data.toString();
      console.log("Friend", friend);
      friends.push(JSON.parse(friend));
    });
    req.pipe(res);
  } else if (req.method === "GET" && items[1] === "friends") {
    // res.writeHead(200, {
    //     "Content-Type": "application/json",
    //   });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    if (items.length === 3) {
      let itemIndex = +items[2];
      res.end(JSON.stringify(friends[itemIndex]));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (req.method === "GET" && items[1] === "messages") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<ul>");
    res.write("<li>Hi, Node Learner</li>");
    res.write("<li>Happy to see you!</li>");
    res.write("</ul>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
