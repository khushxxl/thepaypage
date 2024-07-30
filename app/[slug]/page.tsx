"use client";
import CheckoutForm from "@/components/CheckoutForm";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

function PreviewPage() {
  const [userFound, setuserFound] = useState<any>();

  const searchParams = useSearchParams();
  const userId = searchParams.get("clientId");
  const amount = searchParams.get("amount");

  async function getUserById(id: string) {
    const response = await fetch(`/api/getProjectById?id=${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }
    const userData = await response.json();
    return userData;
  }

  console.log(userId);

  React.useEffect(() => {
    if (userId) {
      getUserById(userId)
        .then((user) => {
          console.log("User Project=>", user);
          setuserFound(user);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userId]);
  if (userFound) {
    const stripePromise = loadStripe(userFound?.stripePublicKey);

    return (
      <div className="max-w-6xl justify-center items-center min-h-screen pt-24  mx-auto">
        <h1 className="text-center text-3xl font-bold">{userFound?.title}</h1>
        <h1 className="text-center text-2xl font-bold mt-4">
          {userFound?.tagline}
        </h1>
        <div className="w-full items-center flex justify-center mt-20">
          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: convertToSubcurrency(49.99),
              currency: "usd",
            }}
          >
            <CheckoutForm
              apiKey={userFound?.stripeSecretKey}
              isEditor={false}
              amount={49.99}
            />
          </Elements>
        </div>
      </div>
    );
  }
}

export default PreviewPage;
