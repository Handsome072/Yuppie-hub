import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 50,
      required: true,
      trim: true,
      uppercase: true,
    },
    username: {
      type: String,
      minLength: 3,
      maxLength: 50,
      required: true,
      trim: true,
      capitalize: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      max: 1024,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    image: [{ type: String, default: [] }],
    userType: { type: String, required: true },
    bio: { type: String, trim: true, default: "" },
    note: { type: String, trim: true, default: "" },
    pays: { type: String, default: "" },
    ville: { type: String, default: "" },
    province: { type: String, default: "" },
    lang: { type: String, default: "fr" },
    avis: [{ userId: String, message: String }],
    disponibilite: [String],
    tauxHoraire: Number,
    montantForfaitaire: Boolean,
    benevolat: Boolean,
    applicationWeb: { type: String, default: "" },
    experiencePro: { type: String, default: "" },
    portfolio: { type: String, default: "" },
    offresDeService: { type: String, default: "" },
    competenceVirtuelle: [{ type: String, default: [] }],
    lienProfessionnelle: { type: String, default: "" },
    statutProfessionnelle: { type: String, default: "" },
    tokens: {
      type: [{ obj: String, value: String, persist: Boolean, infos: String }],
      default: [],
    },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(14);
  this.password = await bcrypt.hash(this.password, salt);
  return next();
});
const UserModel = mongoose.models.users || mongoose.model("users", userSchema);

export default UserModel;
