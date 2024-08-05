import mongoose, { Schema } from "mongoose";

mongoose.connect(
  "mongodb+srv://khushaalchoithramani:3dCpzg8zZaFt6QDm@stipemecluster.shnu1dc.mongodb.net/stripeme-db"
);

mongoose.Promise = global.Promise;

const signedupUserSchema = new Schema(
  {
    emailAddress: String,
  },
  {
    timestamps: true,
    strict: false,
  }
);

const SignedUpUser =
  mongoose.models.SignedUpUser ||
  mongoose.model("SignedUpUser", signedupUserSchema);

export default SignedUpUser;
