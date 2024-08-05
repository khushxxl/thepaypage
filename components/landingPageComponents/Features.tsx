"use client";
import { instructions } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import ReactPlayer from "react-player";

function Features() {
  return (
    <div className="flex flex-col items-center  w-full min-h-screen max-w-6xl   ">
      <h1 className="text-4xl font-bold text-center mt-10">Okayy, but how?</h1>

      <div className="grid grid-cols-1 max-w-xs lg:max-w-6xl lg:grid-cols-3  gap-y-5 lg:gap-y-0 lg:gap-x-4 mt-5 w-full">
        {instructions.map((data, i) => {
          return (
            <div key={i} className="border-2 rounded-lg p-4">
              <p className="text-xl font-bold">
                Step {i + 1}: {data?.title}
              </p>
              <p className="text-md">{data?.desc}</p>
            </div>
          );
        })}
      </div>

      {/* <video width="500" height="500" controls preload="none">
        <source src="../../app/assets/thepaypagedemo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
    </div>
  );
}

export default Features;
