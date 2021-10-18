const verify = (req, res, next) => {
  if (req.query.token == "123") {
    next();
  } else {
    res.json({ result: "nok" });
  }
};

module.exports = verify;
