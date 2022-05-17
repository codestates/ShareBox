const express = require('express');
const router = express.Router();
const controller = require("../controllers/comments");

// GET /items Router와 Controller를 연결합니다.
router.post("/:recordsId", controller.post);
router.patch("/:commentsId", controller.patch);
router.delete("/:commentsId", controller.delete);

module.exports = router;
