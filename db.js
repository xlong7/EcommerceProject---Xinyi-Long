const mongoose = require("mongoose");
const { MONGO_KEY } = process.env;

mongoose.connect(MONGO_KEY,
  { useNewUrlParser: true, useUnifiedTopology: true, },
  (error, client) => {
    if (error) console.log(error);
    else console.log("Connected to DB.");
  }
);

module.exports = mongoose.connection;