const express = require('express');
const config = require('./config');
const app = express();
const routes = require('./routes');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/status", function (req, res) {
  res.send("Server running...");
});

app.use('/api', routes);
app.listen(config.PORT, function () {
  console.log("Server is running on Port 3000");
});