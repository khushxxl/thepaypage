import React from "react";

function Footer() {
  return (
    <div className="flex flex-col items-center  w-full max-w-6xl  ">
      <div>
        <p className="text-4xl font-bold mt-10">Find me here</p>
      </div>

      <div className="mt-10">
        <a target="_blank" href="https://x.com/khushaal_04">
          <img
            height={30}
            width={30}
            src="https://about.x.com/content/dam/about-twitter/x/brand-toolkit/logo-black.png.twimg.1920.png"
            alt=""
          />
        </a>
      </div>
      <div className="my-10">
        <p className="text-xs text-gray-800">
          By Khushaal Choithramani with 💜
        </p>
      </div>
    </div>
  );
}

export default Footer;
