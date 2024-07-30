"use client";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
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

  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStripeInstance = async () => {
      try {
        if (selectedProject?.stripePublicKey) {
          const stripe = await loadStripe(selectedProject.stripePublicKey);
          setStripePromise(stripe ? Promise.resolve(stripe) : null);
        }
      } catch (err) {
        setError("Invalid Stripe API key or network error.");
        console.error(err);
      }
    };

    loadStripeInstance();
  }, [selectedProject]);

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
        <div className="max-w-2xl w-full mt-20 flex-col flex items-center justify-center">
          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            selectedProject &&
            stripePromise &&
            !error && (
              // <></>
              <>
                <Image
                  alt=""
                  height={400}
                  src={require("../app/assets/stripedemo.png")}
                />
                <p className="text-xs text-gray-500  text-center">
                  This checkout form is a image representation of actual stripe
                  form,{" "}
                  <span className="text-blue-700  underline cursor-pointer">
                    Click here
                  </span>{" "}
                  for actual preview
                </p>
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
    );
  };
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className={`w-full flex-col flex items-center pt-10 h-screen`}
    >
      <div className="w-full flex justify-end pr-10">
        <div
          className={`rounded-md bg-gray-200  w-fit  flex items-center space-x-5 p-2`}
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
      {selectedProject ? (
        <>{chosenView == "preview" ? <Preview /> : <CodeView />}</>
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
