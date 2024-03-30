const teacherSchema = require("../Model/teacherSchema");
const adminSchema = require("../Model/adminSchema");
const bcrypt = require('bcrypt');


exports.changePassword = async (req, res, next) => {
  try {

    let newPassword = await bcrypt.hash(req.body.newPassword, 10);

    let change = await teacherSchema.updateOne({
      email: req.body.email,
    },
      { $set: { password: newPassword } },

    )

    if (change.modifiedCount) {
      res.json({ state: "Done" });
    }
    else {

      let change = await adminSchema.updateOne({
        email: req.body.email,
      },
        { $set: { password: newPassword } },

      )

      if (change.modifiedCount) {
        res.json({ state: "Done" });
      }
      else {
        next(Error("inserted email don't match any record"));
      }
    }
  }
  catch (error) {
    next(error);
  }
};
