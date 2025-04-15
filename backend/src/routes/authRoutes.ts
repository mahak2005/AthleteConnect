import express, { Request, Response } from "express";
import { registerUser, loginUser } from "../controllers/authController";

const router = express.Router();

router.get("/signin", (req, res) => {
  res.json({ message: "Use POST method to sign in" });
});
router.get("/signup", (req, res) => {
  res.json({ message: "Use POST method to sign up" });
});


router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Auth routes are working" });
});

router.post("/signup", async (req: Request, res: Response) => {
  await registerUser(req, res);
});

router.post("/signin", async (req: Request, res: Response) => {
  await loginUser(req, res);
});

export default router;
