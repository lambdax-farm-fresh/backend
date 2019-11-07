const express = require("express");
const expressQl = require("express-graphql");

const schema = require("./graphql/schema");

var cors = require("cors");

// Creates express app
const app = express();
const bodyParser = require("body-parser");

// Routes

var indexRouter = require('./routes/index');

const port = process.env.PORT || 8181;

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

app.use('/graphQl', expressQl({
  schema: schema,
  graphiql: true
}))


app.listen(port, () => {
  console.log(`👂👂👂 App is listening on port ${port}.`);
});
