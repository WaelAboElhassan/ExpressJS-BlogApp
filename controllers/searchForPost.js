const BlogPost = require("../models/BlogPost");

module.exports = async (req, res) => {
  if (req.body.search_title === "") {
    res.render("notfound");
  }
  let query = req.body.search_title;
  const filteredPosts = await BlogPost.find({
    title: { $regex: query, $options: "i" },
  });

  res.render("index", { blogposts: filteredPosts });
};
