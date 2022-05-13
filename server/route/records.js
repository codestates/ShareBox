const router = require("express").Router();
const controller = require("../controllers/records");

// GET /items Router와 Controller를 연결합니다.
router.get("/", controller.get);
router.post("/", controller.post);
router.put("/", controller.put);
router.delete("/", controller.delete);

module.exports = router;
