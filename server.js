// server/server.js
require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const {DATABASE_URL} = process.env
mongoose.connect(DATABASE_URL);
mongoose.connection
.on("open", () => console.log("DATABASE STATE", "Connection Open"))
.on("close", () => console.log("DATABASE STATE", "Connection Close"))
.on("error", (error) => console.log("DATABASE STATE", error))

module.exports = mongoose

// Routes
const userRoutes = require('./routes/user.js');
const requirementRoutes = require('./routes/requirement.js');

app.use('/user', userRoutes);
app.use('/requirement', requirementRoutes);

// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
