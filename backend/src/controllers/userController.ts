import { Request, Response } from "express";
import User from "../models/User";
import { AuthRequest } from "../middleware/authMiddleware";

// Get User Profile
export const getUserProfile = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(req.user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
export const updateUserProfile = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: No user found in request" });
        }

        console.log("Updating profile for user:", req.user._id);
        console.log("Profile update request body:", req.body);

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { 
            birthdate, gender, location, whySponsorMe,  sport,
            awardsAccolades, gallery, profileStatus, team 
        } = req.body;

        // Ensure nested objects exist before updating
        if (!user.primaryInfo) user.primaryInfo = {};
        if (!user.moreInfo) user.moreInfo = { profileStatus: "" };

        user.primaryInfo.birthdate = birthdate ?? user.primaryInfo.birthdate;
        user.primaryInfo.gender = gender ?? user.primaryInfo.gender;
        user.primaryInfo.location = location ?? user.primaryInfo.location;

        user.whySponsorMe = whySponsorMe ?? user.whySponsorMe;
        user.sport = sport ?? user.sport;
        // console.log("Updated sport value before saving:", user.sport);
        // await user.save();
        // console.log("User saved successfully");
        
        user.awardsAccolades = awardsAccolades ?? user.awardsAccolades;
        user.gallery = gallery ?? user.gallery;

        user.moreInfo.profileStatus = profileStatus ?? user.moreInfo.profileStatus;
        user.moreInfo.team = team ?? user.moreInfo.team;

        await user.save();

        res.json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error("Error updating profile:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ message: "Server error", error: errorMessage });
    }
};