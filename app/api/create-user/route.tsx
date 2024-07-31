import User from "@/app/(models)/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = body.formData;
    await User.create(data);

    return NextResponse.json({ message: "Project Added" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error Occured", error },
      { status: 500 }
    );
  }
}

// export async function GET() {}
