"use client";
import EditorArea from "@/components/EditorArea";
import LeftSideBar from "@/components/LeftSideBar";
import RightBar from "@/components/RightBar";
import { AppContext } from "@/context/AppContext";
import { useUser } from "@clerk/nextjs";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useEffect } from "react";

export default function Home() {
  const { user } = useUser();

  const { hideSideBar, sethideSideBar } = useContext(AppContext);
  console.log(user);
  return (
    <main className="flex flex-col h-full lg:flex-row  items-center w-full  md:items-start min-h-screen">
      {hideSideBar && (
        <div className=" ml-5 mt-5">
          <MenuIcon
            onClick={() => sethideSideBar(!hideSideBar)}
            className=" cursor-pointer"
          />
        </div>
      )}

      {/* <div className="hidden xl:flex h-full lg:col-span-1">
        <LeftSideBar />
      </div> */}
      {!hideSideBar && (
        <div className=" h-full w-full lg:border-r-2 lg:w-[35%] 2xl:w-[30%]">
          <RightBar />
        </div>
      )}
      <div className="w-full">
        <EditorArea />
      </div>
    </main>
  );
}
