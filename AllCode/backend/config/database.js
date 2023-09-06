const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   useCreateIndex: true,
    // useCreateIndex has removed from version-16
    })
    .then((data) => {
      console.log(`Db connection to server: ${data.connection.host}`);
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = connectDatabase;
