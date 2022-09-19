require("./database/connections");
const bodyParser = require('body-parser');
const express = require("express");
const path = require("path");
const winston = require('winston');
require("dotenv").config();

// Acquiring Errors.
const { errors } = require('./middlewares/errors');

// ========================================
const app = express();
const PORT = process.env.PORT || 3000;

// ========================================
app.use(errors);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public/")));
app.use(express.static(path.join(__dirname, "/uploads/")));

// ========================================
app.set('view engine', 'ejs');

// ========================================
app.use("/", require("./routes/post_routes"));

// =========================================
app.listen(PORT, () => {
  console.log(`Server Application Running on Port http://localhost:${PORT}`);
})