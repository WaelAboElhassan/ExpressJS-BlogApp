const BlogPost = require("../models/BlogPost");

module.exports = async (req, res) => {
  const post = await BlogPost.findById(req.params.id).populate("userId");
  if (post) {
    //console.log(post);
    res.render("post", { post });
  } else {
    res.render("notfound");
  }
};
