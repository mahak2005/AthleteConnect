
import mongoose, { Schema,model, Document } from "mongoose";

interface IPrimaryInfo {
  birthdate?: Date;
  gender?: string;
  location?: string;
}

interface IMoreInfo {
  profileStatus: string;
  team?: string;
}

interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  userType: string;
  profileImage?: string;
  primaryInfo: IPrimaryInfo;
  whySponsorMe?: string;
  sport?: string;
  awardsAccolades?: string[];
  gallery?: string[];
  moreInfo: IMoreInfo;
}

const PrimaryInfoSchema = new Schema<IPrimaryInfo>({
  birthdate: { type: Date },
  gender: { type: String },
  location: { type: String },
});

const MoreInfoSchema = new Schema<IMoreInfo>({
  profileStatus: { type: String, default: "Professional" },
  team: { type: String },
});

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, default: "Athlete" },
    sport: { type: String, required: true},
    profileImage: { type: String },

    primaryInfo: { type: PrimaryInfoSchema, default: {} },
    
    whySponsorMe: { type: String, default: "" },
    awardsAccolades: { type: [String], default: [] },
    gallery: { type: [String], default: [] },

    moreInfo: { type: MoreInfoSchema, default: {} },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

export default mongoose.model<IUser>("User", UserSchema);
