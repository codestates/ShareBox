const router = require("express").Router();
const controller = require("../controllers/logout");

// GET /items Router와 Controller를 연결합니다.
router.get("/", controller.get);

module.exports = router;
