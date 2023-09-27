const router = require("express").Router();
const secureAPI = require("../../utils/secure");
const Controller = require("./user.controller");

router.get("/", secureAPI(["admin"]), async (req, res, next) => {
  try {
    const { page, limit, name, role } = req.query;
    const search = { name, role };
    const result = await Controller.list(page, limit, search);

    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.get("/profile", secureAPI(["user", "admin"]), async (req, res, next) => {
  try {
    const result = await Controller.getById(req.currentUser);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.put("/profile", secureAPI(["user", "admin"]), async (req, res, next) => {
  try {
    const me = req.currentRole.includes("admin")
      ? req.body.id
      : req.currentUser;
    if (!me) throw new Error("Id is missing");
    const result = await Controller.updatedProfile(me, req.body);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.put("/change-password", secureAPI(["user"]), async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) throw new Error("Password are missing");
    req.created_by = req.currentUser;
    req.updated_by = req.currentUser;
    const result = await Controller.changePassword(req.currentUser, req.body);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.put("/reset-password", secureAPI(["admin"]), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("Email or password is missing.");
    const payload = { password };
    payload.created_by = req.currentUser;
    payload.updated_by = req.currentUser;
    const result = await Controller.resetPassword(email, payload);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.patch("/status/:id", secureAPI(["admin"]), async (req, res, next) => {
  try {
    req.created_by = req.currentUser;
    req.updated_by = req.currentUser;
    const result = await Controller.block(req.params.id, req.body);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", secureAPI(["admin"]), async (req, res, next) => {
  try {
    req.created_by = req.currentUser;
    req.updated_by = req.currentUser;
    const result = await Controller.archive(req.params.id, req.body);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", secureAPI(["admin"]), async (req, res, next) => {
  try {
    const result = await Controller.getById(req.params.id);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
