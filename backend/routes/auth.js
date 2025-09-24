import express from "express";
import { login, logout } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// ✅ Only keep login & logout for demo
router.post("/login", login);
router.get("/logout", logout);

// Example protected route (optional)
router.get("/me", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

export default router;
