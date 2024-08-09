"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import toast from "react-hot-toast";

function SignupInput() {
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
  );
}

export default SignupInput;
