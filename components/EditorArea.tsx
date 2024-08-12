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
import EmailTemplate from "@/app/emails";

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
    showBranding,
    setshowBranding,
    showEmailEditor,
    setshowEmailEditor,
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
        <div className="w-full border flex flex-col items-center">
          <div
            style={{ color: textColorAccent }}
            className={`flex ${bannerbgColor} bg-[#FBE7F3] border-4  max-w-5xl rounded-b-none   rounded items-center w-full justify-center flex-col p-4`}
          >
            <div className=" h-[100px] w-[100px] flex items-center justify-center rounded-full">
              <img
                alt=""
                className=" h-full w-full object-cover rounded-full"
                style={{}}
                src={selectedProject?.logo}
              />
            </div>
            <div className="">
              <p className="font-bold text-4xl mt-3">
                {selectedProject?.title}
              </p>
            </div>
            <div>
              <p className="font-bold text-xl mt-3">
                {selectedProject?.tagline}
              </p>
            </div>
          </div>

          <div className="w-full h-full ">
            <StripePaymentCustom />
            {showBranding && <BrandingComponent />}
          </div>
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
      {/* {!showEmailEditor ? (
        selectedProject ? (
          <>
            <div className="mt-5 mb-5">
              <PreviewSwitcher />
            </div>
            {chosenView == "preview" ? <Preview /> : <CodeView />}
          </>
        ) : (
          <div className="flex max-w-full w-full justify-center items-center flex-col pt-20">
            <CircleHelp />
            <p className="font-semibold text-xl mt-3">no project is selected</p>
          </div>
        )
      ) : (
        <EmailTemplate userFirstname={""} />
      )} */}

      {selectedProject ? (
        !showEmailEditor ? (
          <>
            <div className="mt-5 mb-5">
              <PreviewSwitcher />
            </div>
            {chosenView == "preview" ? <Preview /> : <CodeView />}
          </>
        ) : (
          <EmailTemplate userFirstname={""} />
        )
      ) : (
        <div className="flex max-w-full w-full justify-center items-center flex-col pt-20">
          <CircleHelp />
          <p className="font-semibold text-xl mt-3">no project is selected</p>
        </div>
      )}
    </div>
  );
}

export default EditorArea;
