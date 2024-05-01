const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect("mongodb+srv://phuccao:cp31012003@cluster0.fdtoihy.mongodb.net/shopit", { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((con) => {
      console.log(
        `MongoDB Database connected with HOST: ${con.connection.host}`
      );
    });
};

module.exports = connectDatabase;
