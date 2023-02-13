const express = require("express");
const { body } = require("express-validator");

const isAuth = require("../middleware/is-auth");

const User = require("../models/user");
const authController = require("../controllers/auth");

const router = express.Router();

router.get("/status", isAuth, authController.getStatus);

router.put("/status", isAuth, authController.putStatus);

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-mail address already exists.");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  authController.signup
);

router.post("/login", authController.login);

module.exports = router;
