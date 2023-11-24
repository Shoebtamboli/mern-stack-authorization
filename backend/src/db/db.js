const mongoose = require("mongoose");

// MongoDB URI
const mongoURI = process.env.MONGO_URI || "mongodb://localhost/mydatabase";

// Create mongo connection
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));
