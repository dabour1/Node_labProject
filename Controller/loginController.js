const teacherSchema = require("../Model/teacherSchema");
const adminSchema = require("../Model/adminSchema");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {

  let user = await teacherSchema.findOne({
    email: req.body.email,

  })
  if (user) {
    let match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      let token = jwt.sign(
        {
          _id: user._id,
          role: "teacher",
        },
        process.env.SECRET_KEY, { expiresIn: "1hr" }
      );
      res.json({ data: "Authenticated", token });
    }
  }
  else {
    user = await adminSchema.findOne({
      email: req.body.email
    })
    if (user) {
      let match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        let token = jwt.sign(
          {
            _id: user._id,
            role: "admin",
          },
          process.env.SECRET_KEY, { expiresIn: "1hr" }
        );
        res.json({ data: "Authenticated", token });
      }
    }
    else {
      next(Error("Not Authenticated"));
    }
  }
};
