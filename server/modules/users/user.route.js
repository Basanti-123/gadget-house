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

router.get("/profile", secureAPI(["user"]), async (req, res, next) => {
  try {
    const result = await Controller.getById(req.currentUser);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.put("/profile", secureAPI(["user", "admin"]), async (req, res, next) => {
  try {
    if (req.currentRole.includes("admin")) {
      const { id, ...rest } = req.body;
      res.created_by = req.currentUser;
      res.updated_by = req.currentUser;
      const result = await Controller.updatedProfile(id, rest);
      res.json({ data: result, msg: "success" });
    } else {
      const result = await Controller.updatedProfile(req.currentUser, req.body);
      res.json({ data: result, msg: "success" });
    }
  } catch (e) {
    next(e);
  }
});

router.put("/change-password", secureAPI(["user"]), async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = payload;
    if (!oldPassword || !newPassword) throw new Error("Password are missing");
    req.created_by = req.currentUser;
    req.updated_by= req.currentUser;
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
    const payload = {password };
    payload.created_by = req.currentUser;
      payload.updated_by = req.currentUser;
    const result = await Controller.resetPassword(email, password);
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

router.get("/:id", secureAPI(["admin", "user"]), async (req, res, next) => {
  try {
    const result = await Controller.getById(req.params.id);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});



module.exports = router;
