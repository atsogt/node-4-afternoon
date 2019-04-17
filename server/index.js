require("dotenv").config();
const express = require("express");
const session = require("express-session");
const checkForSession = require("../server/models/middleware/checkForSession");
const swagController = require("./models/controller/swagController");
const authController = require("./models/controller/authController");
const cartController = require(".//models/controller/cartController");
const searchController = require("./models/controller/searchController");

const app = express();

let { SERVER_PORT, SESSION_SECRET } = process.env;

app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
app.use(checkForSession);
app.use(express.static(`${_dirname}/../build`));

app.post("/api/register", authController.register);
app.post("/api/login", authController.login);
app.post("/api/signout", authController.signOut);
app.get("/api/user", authController.getUser);
//swag
app.get("/api/swag", swagController.read);
//Cart
app.post("/api/cart/checkout", cartController.checkout);
app.post("/api/cart/:id", cartController.add);
app.delete("/api/cart/:id", cartController.delete);
//search
app.get("/api/search", searchController.search);

app.listen(SERVER_PORT, () => {
  console.log(`Server is listening to port ${SERVER_PORT}.`);
});
