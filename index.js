const express = require("express");

// Creates express app
const app = express();
const bodyParser = require("body-parser");

const port = 3000;

// MIDDLEWARE
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Root url
app.get("/", (req, res) => {
  res.send("🏃🏃🏃 Server is running.");
});

app.listen(port, () => {
  console.log(`👂👂👂 App is listening on port ${port}.`);
});
