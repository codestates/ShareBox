const express = require("express");
const router = express.Router();
const signupRouter = require("./signup");
const logoutRouter = require("./logout");
const mainRouter = require("./main");
const recordsRouter = require("./records");
const categorysRouter = require("./categorys");
const searchRouter = require("./search");

// TODO: Endpoint에 따라 적절한 Router로 연결해야 합니다.
router.use("/signup", signupRouter);
router.use("/logout", logoutRouter);
router.use("/main", mainRouter);
router.use("/records", recordsRouter);
router.use("/categorys", categorysRouter);
router.use("/search", searchRouter);

//=========================================================

const loginRouter = require("./login");
const commentsRouter = require("./comments");
const userinfoRouter = require("./userinfo");
const usersRouter = require("./users");

// TODO: Endpoint에 따라 적절한 Router로 연결해야 합니다.

router.use("/login", loginRouter);
router.use("/comments", commentsRouter);
router.use("/users", usersRouter);
router.use("/userinfo", userinfoRouter);

module.exports = router;
