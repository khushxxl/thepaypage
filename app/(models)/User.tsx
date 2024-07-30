import mongoose, { Schema } from "mongoose";

mongoose.connect(
  "mongodb+srv://khushaalchoithramani:3dCpzg8zZaFt6QDm@stipemecluster.shnu1dc.mongodb.net/stripeme-db"
);

mongoose.Promise = global.Promise;

const userSchema = new Schema({
  userName: String,
  profileImg: String,
  userEmail: String,
  clerkId: String,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
