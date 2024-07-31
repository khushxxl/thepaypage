import User from "@/app/(models)/User";

export async function createUser(user: any) {
  try {
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}
