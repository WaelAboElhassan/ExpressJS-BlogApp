const BlogPost = require("../models/BlogPost");

module.exports = async (req, res) => {
  const blogposts = await BlogPost.find({}).populate("userId");

  blogposts ? res.render("index", { blogposts }) : res.render("notfound");
  //console.log(blogposts);
  console.log(req.session);
};
