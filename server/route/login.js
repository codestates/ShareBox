const router = require("express").Router();
const controller = require("../controllers/login");

// GET /items Router와 Controller를 연결합니다.
router.post("/", controller.post);

module.exports = router;
