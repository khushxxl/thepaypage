import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// const stripe = new Stripe(
//   "sk_test_51PhlYaCRmGYjmhYk1qKnkwn1zAK6Ba9FZ52rOsmy3PGbcuofbKzSsXnOHAvDGLIunjPNxVefAIDeMOHCEqXQack600Q7J2IHKM",
//   {}
// );

export async function POST(request: NextRequest) {
  try {
    const { stripeSecretKey, priceId } = await request.json();
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

      return_url: `http://localhost:3000/return?session_id={CHECKOUT_SESSION_ID}`,
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

    const stripe = new Stripe(
      "sk_test_51PhlYaCRmGYjmhYk1qKnkwn1zAK6Ba9FZ52rOsmy3PGbcuofbKzSsXnOHAvDGLIunjPNxVefAIDeMOHCEqXQack600Q7J2IHKM",
      {}
    );

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      status: session.status,
      customer_email: session.customer_details?.email,
      mongo_id: session.metadata?.user_id,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
