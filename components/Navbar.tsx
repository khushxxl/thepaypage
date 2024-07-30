"use client";
import React from "react";
import { CreateProjectDialog } from "./CreateProjectDialog";
import Link from "next/link";
import { Link2, LinkIcon } from "lucide-react";
import { AppContext } from "@/context/AppContext";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { usePathname } from "next/navigation";

function Navbar() {
  const { allProjects, setallProjects, selectedProject, setselectedProject } =
    React.useContext(AppContext);

  const pathName = usePathname();

  if (pathName == "/") {
    return (
      <div className="p-3 justify-between flex items-center border-b-2 sticky bg-white top-0">
        <div className=" flex items-center space-x-3">
          <Link href={"/"}>
            <h1 className="text-2xl font-bold text-blue-500 w-fit">stripeme</h1>
          </Link>
          <CreateProjectDialog />
        </div>

        <div>
          <Link
            target="_blank"
            href={`/checkoutPayment?clientId=${
              selectedProject?._id
            }&isPreview=true&amount=${convertToSubcurrency(49.99).toString()}`}
          >
            <LinkIcon />
          </Link>
        </div>
      </div>
    );
  }
}

export default Navbar;
