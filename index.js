const express = require("express");
var cors = require("cors");

// Creates express app
const app = express();
const bodyParser = require("body-parser");

// Routes

var indexRouter = require('./routes/index');

const port = process.env.PORT || 3000;

// MIDDLEWARE
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

//Routes

app.use('/', indexRouter);


app.listen(port, () => {
  console.log(`👂👂👂 App is listening on port ${port}.`);
});
