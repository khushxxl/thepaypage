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

      <div className="max-w-4xl flex items-center mt-20 justify-center w-full max-h-[500px] h-full">
        <iframe
          className="lg:w-[700px] lg:h-[400px] rounded-xl w-[400px] h-[250px]"
          src="https://www.youtube.com/embed/vrkcWYVVZhw?si=_T47Y3XBIR3gdSFu?autoplay=1&allowfullscreen=1"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      {/* <video width="500" height="500" controls preload="none">
        <source src="../../app/assets/thepaypagedemo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
    </div>
  );
}

export default Features;
