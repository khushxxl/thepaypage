import mongoose, { Schema } from "mongoose";

mongoose.connect(
  "mongodb+srv://khushaalchoithramani:3dCpzg8zZaFt6QDm@stipemecluster.shnu1dc.mongodb.net/stripeme-db"
);

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
