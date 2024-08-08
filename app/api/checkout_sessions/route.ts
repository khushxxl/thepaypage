import { BASE_URL } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// const stripe = new Stripe(
//   "sk_test_51PhlYaCRmGYjmhYk1qKnkwn1zAK6Ba9FZ52rOsmy3PGbcuofbKzSsXnOHAvDGLIunjPNxVefAIDeMOHCEqXQack600Q7J2IHKM",
//   {}
// );

export async function POST(request: NextRequest) {
  try {
    const { stripeSecretKey, priceId, projectId } = await request.json();
    const stripe = new Stripe(stripeSecretKey, {});

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId, // Replace with actual Price ID
          quantity: 1,
        },
      ],
      metadata: {
        user_id: "66a7daa1a659e92f83cdc852",
      },
      mode: "payment",

      return_url: `${BASE_URL}/return?session_id={CHECKOUT_SESSION_ID}&project_id=${projectId}`,
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const sessionId = searchParams.get("session_id") || "";
    const projectId = searchParams.get("project_id") || "notfound";

    console.log("from get func->", sessionId);

    const response = await fetch(
      `http://localhost:3000/api/getProjectById?id=${projectId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch data");
    }

    const data = await response.json();

    const stripe = new Stripe(data?.stripeSecretKey, {});

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      status: session?.payment_status,
      customer_email: session.customer_details?.email,
      mongo_id: session.metadata?.user_id,
      sessionId,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
