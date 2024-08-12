"use client";
import EditorArea from "@/components/EditorArea";
import LeftSideBar from "@/components/LeftSideBar";
import RightBar from "@/components/RightBar";
import { AppContext } from "@/context/AppContext";
import { useUser } from "@clerk/nextjs";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useEffect } from "react";
import EmailTemplate from "../emails";

export default function Home() {
  const { user } = useUser();

  const { hideSideBar, sethideSideBar, showEmailEditor, setshowEmailEditor } =
    useContext(AppContext);
  console.log(user);
  return (
    <main className="flex items-center w-full flex-col lg:flex-row  md:items-start min-h-screen ">
      {!hideSideBar && (
        <div className=" h-full min-h-[120vh] lg:border-r-2  w-full lg:w-[35%] 2xl:w-[25%]">
          <RightBar />
        </div>
      )}
      <div className="w-full">
        {/* <EmailTemplate userFirstname={""} /> */}
        {/* {!showEmailEditor ? <EditorArea /> : <EmailTemplate userFirstname="" />} */}
        <EditorArea />
      </div>
    </main>
  );
}
