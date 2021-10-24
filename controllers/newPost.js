const e = require("express");

module.exports = (req, res) => {
  if (req.session.userId) {
    res.render("create", { createPost: true });
  } else {
    res.redirect("/auth/login");
  }
};
