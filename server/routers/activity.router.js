import activityController from "../controllers/activity.controller.js";

import express from "express";
const router = express.Router();

router.post("/", activityController.create);

export default router;
