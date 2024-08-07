import SignedUpUser from "@/app/(models)/SignUpUserSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Check if email already exists in SignedUpUser collection
    const existingSignup = await SignedUpUser.findOne({ emailAddress: email });

    if (!existingSignup) {
      // If email does not exist, create a new sign-up entry
      await SignedUpUser.create({ emailAddress: email });
      return NextResponse.json({ message: "Sign up Added" }, { status: 201 });
    } else {
      // If email exists, return a 400 status indicating conflict
      return NextResponse.json({ message: "Sign up exists" }, { status: 400 });
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error occurred:", error);
    return NextResponse.json(
      { message: "Error Occurred while signing up", error },
      { status: 500 }
    );
  }
}
