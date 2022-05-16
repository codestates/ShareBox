const router = require("express").Router();
const controller = require("../controllers/records");

// GET /items Router와 Controller를 연결합니다.
router.get("/:recordsId", controller.get);
router.post("/", controller.post);
router.put("/:recordsId", controller.put);
router.delete("/:recordsId", controller.delete);

module.exports = router;
