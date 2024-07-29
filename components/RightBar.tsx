"use client";
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
function RightBar() {
  const { newProjectName, setnewProjectName } = useContext(AppContext);
  return (
    <div className="border-l-2 w-full h-full pl-2 pt-4">
      <div className=" max-w-[200px]">
        <Label>Enter Project Name</Label>
        <Input placeholder="Enter here" className="mt-2" />
      </div>
    </div>
  );
}

export default RightBar;
