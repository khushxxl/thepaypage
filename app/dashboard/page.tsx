"use client";
import EditorArea from "@/components/EditorArea";
import LeftSideBar from "@/components/LeftSideBar";
import RightBar from "@/components/RightBar";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUser();
  console.log(user);
  return (
    <main className="grid grid-cols-10">
      <div className="col-span-2">
        <LeftSideBar />
      </div>
      <div className="col-span-6">
        <EditorArea />
      </div>
      <div className="col-span-2">
        <RightBar />
      </div>
    </main>
  );
}
