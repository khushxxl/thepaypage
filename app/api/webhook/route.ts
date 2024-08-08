import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const sendPositiveStatus = () => {};

export async function POST(req: Request) {
  const body = await req.text();

  const signature = headers().get("Stripe-Signature") as string;

  const stripe = new Stripe(
    "sk_test_51PhlYaCRmGYjmhYk1qKnkwn1zAK6Ba9FZ52rOsmy3PGbcuofbKzSsXnOHAvDGLIunjPNxVefAIDeMOHCEqXQack600Q7J2IHKM",
    {}
  );

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      "whsec_ee05e89e272c85d3f38de884e6eebb9d1c15e4b3284a8eb020f111b761478677"
    );
    console.log("event from webhook");
    console.log(event);
  } catch (error) {
    return new NextResponse("invalid signature ", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  console.log("Loggin Session", session);

  if (event.type == "checkout.session.async_payment_succeeded") {
    console.log("Payment was successfull - From Webhook");

    console.log("hitting consume webhook now");

    // do something here

    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    console.log("seubscription data - ", subscription);
  }
  return new NextResponse("Okayy ", { status: 200 });
}
