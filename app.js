const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongodb = require("mongoose");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const flash = require("connect-flash");

try {
  mongodb.connect("mongodb://localhost/blog_database", {
    useNewUrlParser: true,
  });
} catch (error) {
  return error;
}

/* const aboutPage = path.resolve(__dirname, "public/about.html");
const homePage = path.resolve(__dirname, "public/index.html");
const contactPage = path.resolve(__dirname, "public/contact.html");
const postPage = path.resolve(__dirname, "public/post.html");
 */
const app = new express();

app.use(express.static("public"));
app.set("view engine", "ejs");

// user session
app.use(
  expressSession({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);

// flash validation errors after send to user
app.use(flash());

global.loggedIn = null;
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;

  next();
});

// file upload
app.use(fileUpload());

// form validation middleware
// make sure validation after file upload middleware
// since we depend on the req object having the files property.

const validateMiddleWare = require("./middleware/validationMiddleware");
app.use("/posts/store", validateMiddleWare);

// bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// controllers
const newPostController = require("./controllers/newPost");
const viewPostController = require("./controllers/viewPost");
const createPostController = require("./controllers/createPost");
const viewPostsListController = require("./controllers/viewPostsList");
const searchFoPostController = require("./controllers/searchForPost");
const newUserController = require("./controllers/newUser");
const viewAboutpgCotroller = require("./controllers/viewAbout");
const viewContactController = require("./controllers/viewContact");
const createUserController = require("./controllers/storeUser");
const viewLoginController = require("./controllers/viewLogin");
const loginUserController = require("./controllers/loginUser");
const authMiddleware = require("./middleware/authMiddleware");
const redirIfAuthMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");
const logoutController = require("./controllers/logout");

// login
app.get("/auth/login", redirIfAuthMiddleware, viewLoginController);
app.post("/users/login", redirIfAuthMiddleware, loginUserController);

//logout
app.get("/auth/logout", logoutController);

//user registration
app.get("/auth/register", redirIfAuthMiddleware, newUserController);
app.post("/users/register", redirIfAuthMiddleware, createUserController);

app.get("/", viewPostsListController);

app.get("/about", viewAboutpgCotroller);

app.get("/contact", viewContactController);

app.get("/post/:id", viewPostController);

app.get("/posts/new", authMiddleware, newPostController);

app.post("/posts/store", authMiddleware, createPostController);

app.post("/posts/search", searchFoPostController);

// not found page stay at the end of all routes
app.use((req, res) => res.render("notfound"));

app.listen(3000, () => {
  console.log(`Server Express running at http://localhost:3000`);
});
