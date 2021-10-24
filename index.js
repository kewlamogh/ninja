const credits = require("./credits").Credits();
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static("ninja/static"));

app.get('/', (req, res) => {
  res.sendFile(__dirname+"/ninja/index.html");
});

app.get("/credits", (req, res) => {
    res.send(credits);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});
