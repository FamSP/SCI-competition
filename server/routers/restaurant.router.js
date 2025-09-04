import restaurantController from "../controllers/restaurant.controler.js";
import authMiddleware from "../middleware/auth.jwt.js";

import express from "express";
const router = express.Router();
// POST http://localhost:5000/api/v1/restaurant
router.post("/", restaurantController.create);

// GET http://localhost:5000/api/v1/restaurant
router.get("/", authMiddleware.verifyToken, restaurantController.getAll);

// GET http://localhost:5000/api/v1/restaurant/:id
router.get(
  "/:id",
  authMiddleware.verifyToken,
  authMiddleware.isModOrAdmin,
  restaurantController.getById
);

// GET http://localhost:5000/api/v1/restaurant/:id
router.put(
  "/:id",
  authMiddleware.verifyToken,
  authMiddleware.isAdmin,
  restaurantController.update
);

// GET http://localhost:5000/api/v1/restaurant/:id
router.delete(
  "/:id",
  authMiddleware.verifyToken,
  authMiddleware.isAdmin,
  restaurantController.deleteById
);

export default router;
