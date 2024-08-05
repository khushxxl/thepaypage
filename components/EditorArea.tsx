"use client";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import {
  Elements,
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import React, { useCallback, useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { AppContext } from "@/context/AppContext";
import {
  CircleHelp,
  ClipboardIcon,
  Code,
  CopyIcon,
  Monitor,
} from "lucide-react";
import { codeText } from "@/lib/utils";
import toast from "react-hot-toast";
import Image from "next/image";
import StripePaymentCustom from "./StripePaymentCustom";
import Link from "next/link";
import BrandingComponent from "./BrandingComponent";

function EditorArea() {
  const {
    allProjects,
    setallProjects,
    selectedProject,
    setselectedProject,
    bgColor,
    setbgColor,
    textColorAccent,
    settextColorAccent,
    bannerbgColor,
    setbannerbgColor,
  } = React.useContext(AppContext);

  const amount = 49.99;

  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStripeInstance = async () => {
      try {
        if (selectedProject?.stripePublicKey) {
          const stripe = await loadStripe(selectedProject?.stripePublicKey);
          setStripePromise(stripe ? Promise.resolve(stripe) : null);
        }
      } catch (err) {
        setError("Invalid Stripe API key or network error.");
        console.error(err);
      }
    };

    loadStripeInstance();
  }, [selectedProject]);

  const fetchClientSecret = useCallback(
    (stripeSecretKey: any, priceId: any) => {
      // Create a Checkout Session
      return fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stripeSecretKey,
          priceId,
        }),
      })
        .then((res) => res.json())
        .then((data) => data.clientSecret);
    },
    [] // Empty dependency array since fetchClientSecret does not depend on any external state or props
  );
  // useEffect(() => {
  //   if (selectedProject) {
  //     fetchClientSecret(
  //       selectedProject?.stripeSecretKey,
  //       "price_1Pigq5CRmGYjmhYk5umwy394"
  //     )
  //       .then((data) => setClientSecret(data))
  //       .catch(console.error);
  //   }
  // }, [selectedProject, fetchClientSecret]);

  const options = { clientSecret };

  const [chosenView, setchosenView] = useState<"preview" | "codeview">(
    "preview"
  );

  const CodeView = () => {
    return (
      <div className=" max-w-2xl p-5 mt-10 text-xs rounded-xl overflow-x-auto bg-gray-200">
        <div>
          <ClipboardIcon
            onClick={() => toast.success("Code Copied")}
            className="cursor-pointer"
          />
        </div>
        <pre className="max-w-2xl">
          <code className="max-w-2xl">{codeText}</code>
        </pre>
      </div>
    );
  };

  const Preview = () => {
    return (
      <div
        className={`max-w-5xl  w-full border ${bgColor} flex p-10 flex-col items-center rounded-xl`}
      >
        {/* Top */}
        <div
          style={{ color: textColorAccent }}
          className={`flex ${bannerbgColor} bg-[#FBE7F3] border-4  max-w-5xl rounded-b-none   rounded items-center w-full justify-center flex-col p-4`}
        >
          <div className="border mt-10 rounded-full bg-white p-3">
            <Code color="black" />
          </div>
          <div className="">
            <p className="font-bold text-4xl mt-3">{selectedProject?.title}</p>
          </div>
          <div>
            <p className="font-bold text-xl mt-3">{selectedProject?.tagline}</p>
          </div>
        </div>

        <div className="w-full h-full ">
          <StripePaymentCustom />
          <BrandingComponent />
        </div>
      </div>
    );
  };

  const PreviewSwitcher = () => {
    return (
      <div className="w-full flex justify-end pr-10">
        <div
          className={`rounded-md bg-gray-200 w-fit flex items-center space-x-5 p-2`}
        >
          <div
            onClick={() => setchosenView("preview")}
            className={`${
              chosenView == "preview" && "bg-gray-300"
            } p-2 rounded`}
          >
            <Monitor size={15} />
          </div>
          <div
            className={`${
              chosenView == "codeview" && "bg-gray-300"
            } p-2 rounded`}
            onClick={() => setchosenView("codeview")}
          >
            <Code size={15} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`flex items-center flex-col `}>
      {selectedProject ? (
        <>
          <div className="mt-5 mb-5">
            <PreviewSwitcher />
          </div>
          {chosenView == "preview" ? <Preview /> : <CodeView />}
        </>
      ) : (
        <div className="flex max-w-full w-full justify-center items-center flex-col pt-20">
          <CircleHelp />
          <p className="font-semibold text-xl mt-3">No Project Selected</p>
        </div>
      )}
    </div>
  );
}

export default EditorArea;
