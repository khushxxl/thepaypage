import React from "react";
import { AvatarCirclesComponent } from "../ui/AvatarCircles";
import Image from "next/image";
import { descCopy } from "@/lib/utils";

function Hero() {
  return (
    <div className="flex  flex-col min-h-[80vh] justify-center w-full max-w-6xl">
      <div className="flex mt-14 lg:mt-0 flex-col lg:flex-row items-center w-full justify-between">
        <div className="space-y-5 flex flex-col items-center md:items-start text-center lg:text-left">
          <h1 className="text-2xl  max-w-2xl lg:text-4xl  font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
            Create Payment Integration with Beautiful Pages in 3 minutes
          </h1>
          <h1 className="max-w-xs lg:max-w-lg text-md  font-semibold">
            {descCopy}
          </h1>
          <div>
            <AvatarCirclesComponent />
          </div>
        </div>
        <div className="flex ml-[20px]">
          <Image
            width={450}
            alt=""
            src={require("../../app/assets/stripeme-mockup-01.png")}
            className=""
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;

// <div className="flex flex-col min-h-[80vh] justify-center w-full">
//   <div className="flex  items-center w-full justify-between">
//     <div className="space-y-5 flex flex-col items-start">
//       {/* <h1 className="text-2xl cursor-pointer  font-bold  w-fit">
//           gottapayme
//         </h1> */}

//       <h1 className="text-4xl max-w-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
//         Create Payment Integration with Beautiful Pages in 3 minutes
//       </h1>
//       <h1 className="max-w-md">{descCopy}</h1>
//       <div>
//         <AvatarCirclesComponent />
//       </div>
//     </div>
//     <div className="flex">
//       <Image alt="" src={require("../../app/assets/stripeme-mockup-01.png")} />
//     </div>
//   </div>
// </div>;
