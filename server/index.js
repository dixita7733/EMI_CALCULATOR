const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser");
const RouterPath = require("./router");
const app = express();

const port = 3000;
app.use(bodyParser.json());
app.use(cors());
app.use("/" , RouterPath)
app.use("/api/adduser", RouterPath);
app.listen(port, () => console.log("Server running on port 3000"))