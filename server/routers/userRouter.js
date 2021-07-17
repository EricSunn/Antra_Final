const router = require("express").Router();
const User = require("../models/userModel");
const Customer = require("../models/customerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const { email, password, passwordVerify, permission } = req.body;

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

    //Save a new user account to database

    const savedUser = await User.create({ email, passwordHash, permission });

    //Log the user in

    const token = jwt.sign(
      {
        user: savedUser.id,
      },
      process.env.JWT_SECRET
    );

    //send the token in a HTML cookie

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .json(savedUser)
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
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

router.get("/loggedIn", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.send({ permission: "none", name: "none" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(verified.user);

    res.send({ permission: user.permission, name: user.email });
  } catch (err) {
    res.send({ permission: "none", name: "none" });
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

router.get("/manage", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.send("none");
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verified.user);

    if (user.permission === "admin") {
      const data = await User.find({ permission: "user" });
      res.json(data);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.send("none");
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verified.user);

    if (user.permission === "admin") {
      await Customer.deleteMany({ author: req.params.id });
      const data = await User.findByIdAndDelete(req.params.id);
      res.json(data);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("delete fail");
  }
});

module.exports = router;
