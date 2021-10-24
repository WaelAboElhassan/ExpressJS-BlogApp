const User = require("../models/User");

module.exports = async (req, res) => {
  const { username, password } = req.body;
  const checkUser = await User.findOne({ username: username });

  if (checkUser) {
    res
      .status(400)
      .json({ error: `${username} already exists `, success: false });
  } else {
    User.create({ username, password }, (error, user) => {
      if (error) {
        const validationErrors = Object.keys(error.errors).map(
          (key) => error.errors[key].message
        );
        //req.session.validationErrors = validationErrors;
        req.flash("validationErrors", validationErrors);
        // keep form data after display errors
        req.flash("data", [
          { username: username.toString(), password: password.toString() },
        ]);

        return res.redirect("/auth/register");
      }
      res.redirect("/");
    });
  }
};
