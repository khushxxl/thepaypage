import { NextResponse } from "next/server";

let storedData: any;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    storedData = body;
    // localStorage.setItem("paymentStatus", body.message);

    console.log("testing cosume webhook");
    return NextResponse.json({ message: "Message hit" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  //   const paymentStatus = localStorage.getItem("paymentStatus");
  try {
    return NextResponse.json({ storedData }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
