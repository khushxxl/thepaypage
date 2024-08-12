"use client";
import React, { useState } from "react";
import { CreateProjectDialog } from "./CreateProjectDialog";
import Link from "next/link";
import { Link2, LinkIcon } from "lucide-react";
import { AppContext } from "@/context/AppContext";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { usePathname, useRouter } from "next/navigation";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { ProjectSelector } from "./ProjectSelector";

function Navbar() {
  const { allProjects, setallProjects, selectedProject, setselectedProject } =
    React.useContext(AppContext);

  const pathName = usePathname();

  const router = useRouter();

  const { user, isSignedIn } = useUser();
  const postData = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: "66a7daa1a659e92f83cdc852",
          testAmount: 10,
          isPreview: true,
        }),
      });

      const result = await response.json();

      console.log(result);

      if (result.success) {
        router.push("/checkoutPage");
      }

      console.log("Server response:", result);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  if (pathName == "/dashboard") {
    return (
      <div className="p-5 justify-between flex items-center border-b-2 px-10 sticky z-50 bg-white top-0">
        <div className=" flex items-center space-x-9">
          <Link className="" href={"/"}>
            <h1 className="text-2xl cursor-pointer  font-bold  w-fit">
              💸 thepaypage
            </h1>
          </Link>
          {pathName == "/dashboard" && (
            <div className="space-x-4">
              <CreateProjectDialog />
              <ProjectSelector />
            </div>
          )}
        </div>

        {/* 
        <div>
          <Link
            target="_blank"
            href={`/checkoutPayment?clientId=${
              selectedProject?._id
            }&isPreview=true&amount=${convertToSubcurrency(49.99).toString()}`}
          >
            <LinkIcon />
          </Link>
        </div> */}

        <div className="flex items-center space-x-4">
          {selectedProject && pathName == "/dashboard" && (
            <div
              className=" border flex items-center space-x-2 p-2 rounded-md cursor-pointer"
              onClick={postData}
            >
              <LinkIcon />
              <p>Preview</p>
            </div>
          )}

          {isSignedIn ? <UserButton /> : <SignInButton />}
        </div>
      </div>
    );
  }

  if (pathName == "/") {
    return (
      <div className="p-5 max-w-7xl mx-auto justify-between flex items-center z-50  sticky bg-white top-0">
        <div className=" flex items-center space-x-3">
          <Link className="" href={"/"}>
            <h1 className="text-2xl cursor-pointer  font-bold w-fit">
              💸 thepaypage
            </h1>
          </Link>
        </div>

        {/* <div className="lg:flex items-center space-x-8 hidden">
          <Link href={""}>
            <p className="hover:underline">Pricing</p>
          </Link>
          <Link href={""}>
            <p className="hover:underline">How it works?</p>
          </Link>
          <Link href={""}>
            <p className="hover:underline">FAQ</p>
          </Link>
        </div> */}
        {/* <div className="flex items-center space-x-4">
          <p className="cursor-pointer font-mono">Coming Soon</p>
        </div> */}

        <div className="flex items-center space-x-3">
          <Link href={"/dashboard"}>
            <p className="underline">Dashboard</p>
          </Link>
          {isSignedIn ? <UserButton /> : <SignInButton />}
        </div>
      </div>
    );
  }
}

export default Navbar;
