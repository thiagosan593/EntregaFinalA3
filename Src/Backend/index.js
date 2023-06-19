const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());

// iniciar registros
const database = require("./database");
database.start();

const indexRouter = require("./routes");
app.use("/", indexRouter);

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
