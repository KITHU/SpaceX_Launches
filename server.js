const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

const PORT = process.env.PORT || 4000;
const app = express();

app.get("/", function (req, res) {
  res.json({
    message: "visit /graph/launch"
  });
});


app.use('/graph/launch', graphqlHTTP({
  schema,
  graphiql:true
}));


// error handler for path
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});


// error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
});


app.listen(PORT, () => console.log(`server listening to port: ${PORT}`));
