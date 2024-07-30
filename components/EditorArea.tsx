"use client";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { AppContext } from "@/context/AppContext";
import { CircleHelp, Code } from "lucide-react";

function EditorArea() {
  const {
    allProjects,
    setallProjects,
    selectedProject,
    setselectedProject,
    bgColor,
    setbgColor,
  } = React.useContext(AppContext);
  const amount = 49.99;

  // const [stripePromise, setStripePromise] =
  //   useState<Promise<Stripe | null> | null>(null);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const loadStripeInstance = async () => {
  //     try {
  //       if (selectedProject?.stripePublicKey) {
  //         const stripe = await loadStripe(selectedProject.stripePublicKey);
  //         setStripePromise(stripe ? Promise.resolve(stripe) : null);
  //       }
  //     } catch (err) {
  //       setError("Invalid Stripe API key or network error.");
  //       console.error(err);
  //     }
  //   };

  //   loadStripeInstance();
  // }, [selectedProject]);

  const stripePromise = loadStripe(
    "pk_test_51PfezLFmDqFvsXm8oXniQ3cgd3Q6wCvfxZ5tCrVSWBIOqAuz9CIGH6NrfWPN6JQ4rl5vdTPWT2e813q8VEVIsa9O00q4oSWK1w"
  );

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className={`w-full flex-col flex items-center pt-10 h-screen`}
    >
      {selectedProject ? (
        <>
          <div className="border rounded-full p-3">
            <Code />
          </div>
          <div>
            <p className="font-bold text-4xl mt-3">{selectedProject?.title}</p>
          </div>
          <div>
            <p className="font-bold text-xl mt-3">{selectedProject?.tagline}</p>
          </div>
          <div className="max-w-2xl w-full mt-20">
            {error ? (
              <div className="error-message">{error}</div>
            ) : (
              selectedProject &&
              stripePromise &&
              !error && (
                // <></>
                <>
                  <Elements
                    stripe={stripePromise}
                    options={{
                      mode: "payment",
                      amount: convertToSubcurrency(amount),
                      currency: "usd",
                    }}
                  >
                    <CheckoutForm
                      apiKey={selectedProject?.stripeSecretKey}
                      isEditor={true}
                      amount={amount}
                    />
                  </Elements>
                </>
              )
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center flex-col">
          <CircleHelp />
          <p className="font-semibold text-xl mt-3">No Project Selected</p>
        </div>
      )}
    </div>
  );
}

export default EditorArea;
