const router = require("express").Router();
const secureAPI = require("../../utils/secure");
const Controller = require("./user.controller");

router.get("/", secureAPI(["admin"]), async (req, res, next) => {
  try {
    const result = await Controller.list();
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;