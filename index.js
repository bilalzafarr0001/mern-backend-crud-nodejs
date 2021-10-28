const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/admin");

const app = express();

app.use(express.json()); // new
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/admin", adminRoutes);

app.get("/admin", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

mongoose.connect("mongodb://localhost:27017/practice-crud-app", {
  useNewUrlParser: "true",
});
mongoose.connection.on("error", (err) => {
  console.log("err", err);
});
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
