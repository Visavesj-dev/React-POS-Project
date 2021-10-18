const express = require("express");
const router = express.Router();
const Users = require("./models/user_schema");
var bcrypt = require("bcryptjs");
const jwt = require("./jwt");
const randtoken = require("rand-token"); // yarn add rand-token

const refreshTokens = {};

router.post("/login", async (req, res) => {
  let doc = await Users.findOne({ username: req.body.username });
  if (doc) {
    if (bcrypt.compareSync(req.body.password, doc.password)) {
      const payload = {
        id: doc._id,
        level: doc.level,
        username: doc.username
      };

      let token = jwt.sign(payload, "10000"); // 5 min 300000
      const refreshToken = randtoken.uid(256);
      refreshTokens[refreshToken] = req.body.username;

      res.json({
        result: "ok",
        token,
        refreshToken,
        message: "Login successfully"
      });
    } else {
      // Invalid password
      res.json({ result: "nok", message: "Invalid password" });
    }
  } else {
    // Invalid username
    res.json({ result: "nok", message: "Invalid username" });
  }
});

router.post("/logout", function(req, res) {
  const refreshToken = req.body.refreshToken;
  if (refreshToken in refreshTokens) {
    delete refreshTokens[refreshToken];
  }
  res.sendStatus(204);
});

// Refresh Token
let count = 0;
router.post("/refresh/token", function(req, res) {
  console.log("Refresh Token : " + count++);
  const refreshToken = req.body.refreshToken;

  if (refreshToken in refreshTokens) {
    const payload = {
      username: refreshTokens[refreshToken],
      level: "normal"
    };
    const token = jwt.sign(payload, "10000"); // 5 min
    res.json({ jwt: token });
  } else {
    res.sendStatus(401);
  }
});

router.post("/register", async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    await Users.create(req.body);
    res.json({ result: "ok", message: "Register successfully" });
  } catch (err) {
    res.json({ result: "nok", message: err.errmsg });
  }
});

module.exports = router;
