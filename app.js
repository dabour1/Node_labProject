const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();
const teacherRoute = require("./Routes/teacherRoutse");
const childRouter = require("./Routes/childRouter");
const classRouter = require("./Routes/classRouter");
const loginRoute = require("./Routes/logInRouter");
const adminRouter = require("./Routes/adminRouter");
const changePasswordRouter = require("./Routes/changePasswordRouter");
const authenticationMW = require("./Midelwares/authenticationMW");

const server = express();

mongoose
  .connect(

    `mongodb+srv://aldabor8:${process.env.DBPASSWORD}@dabour.wtnwggo.mongodb.net/nurserySystem`

  )
  .then(() => {
    console.log("DB Connected....");
    let port = process.env.PORT || 8080
    server.listen(port, () => {
      console.log("I am listening..........", port);
    });
  })
  .catch((error) => {
    console.log("DB Problem ..." + error);
  });


server.use(morgan('dev'));
server.use(cors());
server.use(express.json());
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

server.use(loginRoute);
server.use(changePasswordRouter);
server.use(authenticationMW);

server.use(teacherRoute);
server.use(childRouter);
server.use(classRouter);
server.use(adminRouter);



server.use((request, response) => {
  response.status(404).json({ data: "Not Found" });
});

server.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(418).json({
      err_code: err.code,
      err_message: err.message,
    });
  } else {
    res.status(500).json({ data: `Error :  ${err}` });
  }
});
// server.use((error, request, response, next) => {
//   response.status(500).json({ data: `Error :  ${error}` });
// });
