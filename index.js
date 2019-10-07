const express = require("express");
var cors = require("cors");

// Creates express app
const app = express();
const bodyParser = require("body-parser");

// Routes

var usersRouter = require('./routes/user');
var authRouter = require('./routes/auth');
var farmRouter = require('./routes/farms');
var inventoryRouter = require('./routes/inventory');

const port = 3000;

// MIDDLEWARE
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

//Routes

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/farms', farmRouter);
app.use('/inventories', inventoryRouter);

// Root url
app.get("/", (req, res) => {
  res.send("🏃🏃🏃 Server is running.");
});

app.listen(port, () => {
  console.log(`👂👂👂 App is listening on port ${port}.`);
});
