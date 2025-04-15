import express from "express";
import { getUserProfile, updateUserProfile } from "../controllers/userController";
import authMiddleware, { AuthRequest } from "../middleware/authMiddleware";
import User from "../models/User";
import { loginUser } from "../controllers/authController";

const router = express.Router();

router.get(
  "/profile",
  authMiddleware,
  async (req: AuthRequest, res: express.Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return; // ✅ Early return to avoid function continuation
      }
      await getUserProfile(req, res);
    } catch (error) {
      res.status(500).json({ message: "Error fetching profile", error });
    }
  }
);


router.get(
  "/:userId",
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const userId = req.params.userId;
      console.log(`Fetching user with ID: ${userId}`);

      // ✅ Check if user exists
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Error fetching user", error });
    }
  }
);

router.post("/login", loginUser);
// ✅ Fix: Ensure async handler does not return a Response object

router.put(
  "/profile",
  authMiddleware,
  async (req: AuthRequest, res: express.Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized: No user found in request" });
        return;
      }

      console.log("Updating profile for user:", req.user._id);
      console.log("Profile update request body:", req.body);

      const user = await User.findById(req.user._id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const {
        birthdate,
        gender,
        location,
        whySponsorMe,
        sport,
        awardsAccolades,
        gallery,
        profileStatus,
        team,

      } = req.body;

      // **Ensure primaryInfo & moreInfo exist before updating**
      if (!user.primaryInfo) user.primaryInfo = {};
      if (!user.moreInfo) user.moreInfo = { profileStatus: "" };

      user.primaryInfo.birthdate = birthdate ?? user.primaryInfo.birthdate;
      user.primaryInfo.gender = gender ?? user.primaryInfo.gender;
      user.primaryInfo.location = location ?? user.primaryInfo.location;

      user.whySponsorMe = whySponsorMe ?? user.whySponsorMe;
      // user.lifestyleInterests = lifestyleInterests ?? user.lifestyleInterests;
      user.awardsAccolades = awardsAccolades ?? user.awardsAccolades;
      user.gallery = gallery ?? user.gallery;
      user.sport = sport ?? user.sport;
      user.moreInfo.profileStatus = profileStatus ?? user.moreInfo.profileStatus;
      user.moreInfo.team = team ?? user.moreInfo.team;

      await user.save();

      res.json({ message: "Profile updated successfully", user });
    } catch (error) {
      console.error("Error updating profile:", error); // **Log actual error**
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({ message: "Error updating profile", error: errorMessage });
    }
  }
);

export default router;
