import { NextRequest, NextResponse } from "next/server";

// In-memory storage for demonstration purposes
let checkoutData: any = null;

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log("Received data:", data);

    // Store data (for demonstration, using in-memory storage)
    checkoutData = data;

    return NextResponse.json({
      success: true,
      message: "Data received successfully",
      data,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { success: false, message: "Error processing request" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log("Sending stored data:", checkoutData);
    return NextResponse.json({ success: true, data: checkoutData });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching data" },
      { status: 500 }
    );
  }
}
