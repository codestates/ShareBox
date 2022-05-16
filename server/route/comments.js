const express = require('express');
const router = express.Router();
const controller = require("../controllers/comments");

// GET /items Router와 Controller를 연결합니다.
router.get("/:recordsId", controller.get);
router.post("/:recordsId/:commentId", controller.post);
router.patch("/:commentId", controller.patch);
router.delete("/:commentId", controller.delete);

module.exports = router;