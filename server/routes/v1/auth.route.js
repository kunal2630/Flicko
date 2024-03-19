const express = require("express");
const router = express.Router();
const { signUp, signIn,deleteUser ,handleGoogleAuth} = require("../../controllers/auth.controller");
const signUpValidator = require("../../validator/signUp/signUp.validator");

router.post("/signup",signUpValidator, signUp);
router.post("/login", signIn);
router.post("/gauth", handleGoogleAuth);
router.delete("/delete", deleteUser);
module.exports = router;
