import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URL);

mongoose.Promise = global.Promise;

const projectSchema = new Schema(
  {
    title: String,
    stripePublicKey: String,
    stripeSecretKey: String,
    userEmail: String,
    tagline: String,
    logo: String,
    test: String,
  },
  {
    timestamps: true,
    strict: false,
  }
);

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
