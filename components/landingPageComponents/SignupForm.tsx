"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import toast from "react-hot-toast";

function SignupForm() {
  const [emailentered, setemailentered] = useState("");
  const [loading, setloading] = useState(false);

  const addSignup = async (e: any) => {
    e.preventDefault();

    setloading(true);

    const res = await fetch("/api/add-signup", {
      method: "POST",
      body: JSON.stringify({ email: emailentered }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json;

    console.log(data);

    if (!res.ok) {
      setloading(false);
      return toast.error("Error / Already Exists");
    }
    toast.success("You have been successfully signed up");
    setemailentered("");
    console.log("Signup added");
  };

  return (
    <div className="flex flex-col items-center  w-full min-h-[50vh] max-w-6xl justify-center   ">
      <div>
        <p className="text-4xl font-bold mt-10">
          Signup to get notified when we release v1
        </p>
      </div>

      <div className=" flex items-center space-x-3 max-w-sm w-full mt-10">
        <Input
          value={emailentered}
          onChange={(e) => setemailentered(e.target.value)}
          className="flex flex-1"
          placeholder="Enter email"
        />
        <div
          onClick={addSignup}
          className="bg-slate-900 cursor-pointer p-2 px-4 rounded-sm text-white"
        >
          <p>Sign up</p>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
