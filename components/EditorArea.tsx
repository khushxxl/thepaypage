"use client";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";

function EditorArea() {
  const amount = 49.99;
  const stripePromise = loadStripe(
    "pk_test_51PhlYaCRmGYjmhYknvmoWqVEvQsndGH1eBtgfZliaJyBsQWOjcOXLL6WXkpvEPPH5OkclqQRRianGFYwP5nepciI00EfRXPnjJ"
  );

  return (
    <div className="w-full flex-col flex items-center pt-20 h-screen">
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "usd",
        }}
      >
        <CheckoutForm amount={amount} />
      </Elements>
    </div>
  );
}

export default EditorArea;
