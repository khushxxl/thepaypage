"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import toast from "react-hot-toast";
import SignupInput from "./SignupInput";

function SignupForm() {
  return (
    <div className="flex flex-col items-center  w-full min-h-[50vh] max-w-6xl justify-center   ">
      <div>
        <p className="text-4xl font-bold text-center mt-10">
          Signup to get notified when we release v1
        </p>
      </div>
      <SignupInput />
    </div>
  );
}

export default SignupForm;
