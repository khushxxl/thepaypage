"use client";
import BrandingComponent from "@/components/BrandingComponent";
import CheckoutForm from "@/components/CheckoutForm";
import { AppContext } from "@/context/AppContext";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import {
  Elements,
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Code } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useContext, useEffect, useState } from "react";

function PreviewPage() {
  const [userFound, setuserFound] = useState<any>();
  const [postData, setpostData] = useState<any>();
  const { bannerbgColor, showBranding, textColorAccent, bgColor } =
    useContext(AppContext);

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

  // React.useEffect(() => {
  //   if (userId) {

  //   }
  // }, [userId]);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/checkout");
      await response.json().then(async (result) => {
        const resData = result?.data;

        setpostData(resData);

        if (resData?.id) {
          await getUserById(resData?.id)
            .then((user) => {
              console.log("User Project=>", user);
              setuserFound(user);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    };

    fetchData();
  }, []);

  const fetchClientSecret = useCallback(
    (stripeSecretKey: any, priceId: any, projectId: any) => {
      // Create a Checkout Session
      return fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stripeSecretKey,
          priceId,
          projectId,
        }),
      })
        .then((res) => res.json())
        .then((data) => data.clientSecret);
    },
    [] // Empty dependency array since fetchClientSecret does not depend on any external state or props
  );
  useEffect(() => {
    if (userFound) {
      fetchClientSecret(
        userFound?.stripeSecretKey,
        "price_1Pigq5CRmGYjmhYk5umwy394",
        userFound?._id
      )
        .then((data) => setClientSecret(data))
        .catch(console.error);
    }
  }, [userFound, fetchClientSecret]);

  const options = { clientSecret };

  if (userFound) {
    // const stripePromise = loadStripe(userFound?.stripePublicKey);

    const stripePromise = loadStripe(userFound?.stripePublicKey);
    return (
      <div className={`w-full lg:p-10 ${bgColor}  justify-center items-center`}>
        <div
          style={{ color: textColorAccent }}
          className="w-full max-w-5xl mx-auto rounded-xl border "
        >
          <div
            className={`flex  ${bannerbgColor}  border-4 rounded-xl items-center w-full justify-center flex-col `}
          >
            <div className="mt-5">
              <img
                alt=""
                height={50}
                width={50}
                className="rounded-full"
                style={{}}
                src={userFound?.logo}
              />
            </div>
            <div className="mt-3">
              <p className="font-bold text-4xl ">{userFound?.title}</p>
            </div>
            <div className="mt-3  mb-2">
              <p className="font-bold text-lg ">{userFound?.tagline}</p>
            </div>
          </div>
          <div className="w-full relative  h-fit rounded-b-lg p-2 bg-white">
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
          {showBranding && <BrandingComponent />}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>check</h1>
      </div>
    );
  }
}

export default PreviewPage;

// {
//   /* <Elements
//             stripe={stripePromise}
//             options={{
//               mode: "payment",
//               amount: convertToSubcurrency(49.99),
//               currency: "usd",
//             }}
//           >
//             <CheckoutForm
//               apiKey={userFound?.stripeSecretKey}
//               isEditor={postData?.isPreview ? true : false}
//               amount={49.99}
//             />
//           </Elements> */
// }
