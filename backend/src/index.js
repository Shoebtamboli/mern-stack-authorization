const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/users.routes");
require("dotenv").config();
require("./db/db");
require("./middleware/passport");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Welcome to the express app");
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
