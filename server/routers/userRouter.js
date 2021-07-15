const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const { email, password, passwordVerify } = req.body;

    // validation

    if (!email || !password || !passwordVerify)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    if (password.length < 6)
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 6 characters",
      });
    if (password !== passwordVerify)
      return res.status(400).json({
        errorMessage: "Please enter the same password twice",
      });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.status(400).json({
        errorMessage: "This email account already exists.",
      });

    //Hash the password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    console.log(passwordHash);

    //Save a new user account to database

    const newUser = new User({
      email,
      passwordHash,
    });

    const savedUser = await newUser.save();

    //Log the user in

    const token = jwt.sign(
      {
        user: savedUser.id,
      },
      process.env.JWT_SECRET
    );
    console.log(token);

    //send the token in a HTML cookie

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
  res.send("test");
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation

    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    const existingUser = await User.findOne({ email: email });
    if (!existingUser)
      return res.status(401).json({
        errorMessage: "This email account doesn't exists.",
      });

    //Hash the password

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect)
      return res.status(401).json({
        errorMessage: "The password is wrong, please try again.",
      });

    //Log the user in
    //Sign the token

    const token = jwt.sign(
      {
        user: existingUser.id,
      },
      process.env.JWT_SECRET
    );

    //send the token in a HTML cookie

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.send(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified.user;

    res.send(true);
  } catch (err) {
    res.send(false);
  }
});

router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

module.exports = router;
