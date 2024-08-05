import Link from "next/link";
import React from "react";

function BrandingComponent() {
  return (
    <div className="w-full flex mt-5 justify-center items-center mb-5">
      <Link href={"/"}>
        <div className="bg-black  text-white p-4 w-fit  rounded-lg">
          <p>built with thepaypage 💜 </p>
        </div>
      </Link>
    </div>
  );
}

export default BrandingComponent;
