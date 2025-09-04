import activityController from "../controllers/activity.controller.js";
import authMiddleware from "../middleware/auth.jwt.js";
import express from "express";
const router = express.Router();
// Create
router.post("/", activityController.create);
//Get All
router.get("/", activityController.getAll);
//Get by ID
router.get("/:id", activityController.getById);
//update
router.put("/:id", activityController.update);
//Delete
router.delete("/:id", activityController.deleteById);

export default router;
