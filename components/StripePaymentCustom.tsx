import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function StripePaymentCustom() {
  return (
    <div className="max-w-5xl flex flex-col-reverse z-[99px] lg:flex-row items-center rounded-t-none bg-white rounded-md   p-4 h-full w-full  mx-auto">
      {/* Left - desc */}
      <div className="h-full w-[55%] pl-5 mt-5 lg:mt-0 ">
        <h1 className="text-gray-400">Product Name</h1>
        <h1 className="font-bold text-3xl">£5.00</h1>
        <div className="h-[200px] w-[200px] flex items-center justify-center bg-gray-300 mt-3">
          <p className="text-xs text-center">Image goes here</p>
        </div>
      </div>

      {/* Right - form */}
      <div className="h-full relative  p-3 border-2 max-w-[400px] w-full rounded-xl">
        <h1 className=" font-semibold text-md">Pay with card</h1>

        <div className="mt-5">
          <Label className="text-xs text-gray-400 font-semibold">Email</Label>
          <Input className="focus:outline-none mt-2 outline-none ring-0 focus:border-0" />
        </div>
        <div className="mt-4">
          <Label className="text-xs text-gray-400 ">Card information</Label>
          <Input
            className=" placeholder-gray-100"
            placeholder="1234 1234 1234 1234"
          />
          <div className="flex items-center">
            <Input placeholder="MM / YY" className="rounded-r-none" />
            <Input className="rounded-l-none" placeholder="CVC" />
          </div>
          <div className="mt-3">
            <Label className="text-xs text-gray-400 font-semibold">
              Card Holder's Name
            </Label>
            <Input placeholder="Full name on card" />
          </div>
          <div className="mt-3">
            <Label className="text-xs text-gray-400 font-semibold">
              Country or region
            </Label>
            <Input value={"India"} />
          </div>

          <div className="w-full mt-10">
            <Button className="w-full bg-blue-700">
              <p>Pay</p>
            </Button>
          </div>
          <div className="w-full mt-5 justify-center items-center">
            <p className=" font-light text-sm text-center text-gray-400">
              powered by <span className="font-bold">stripe</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StripePaymentCustom;
