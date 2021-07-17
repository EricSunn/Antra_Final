const router = require("express").Router();
const Customer = require("../models/customerModel");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");

router.post("/", auth, async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).send("UnAuthrized");
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    const author = verify.user;
    const { name } = req.body;

    const newCustomer = new Customer({ name, author });

    const savedCustomer = await newCustomer.save();

    res.json(savedCustomer);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    var id = req.params.id;
    await Customer.findByIdAndDelete(id);
    res.send(id);
  } catch (err) {
    console.error(err);
    res.status(500).send("delete fail");
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    var id = req.params.id;
    await Customer.findByIdAndUpdate(id, req.body);
    res.send(id);
  } catch (err) {
    console.error(err);
    res.status(500).send("update fail");
  }
});

module.exports = router;
