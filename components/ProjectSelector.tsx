"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname } from "next/navigation";
import { CreateProjectDialog } from "./CreateProjectDialog";
import { AppContext } from "@/context/AppContext";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Code } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export function ProjectSelector() {
  const { user } = useUser();
  const { allProjects, setallProjects, selectedProject, setselectedProject } =
    React.useContext(AppContext);

  async function getUserByEmail(email: any) {
    const response = await fetch(
      `/api/getProject?email=${encodeURIComponent(email)}`
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }
    const userData = await response.json();
    return userData;
  }

  console.log("email from clerk", user?.emailAddresses[0].emailAddress);

  React.useEffect(() => {
    if (user) {
      getUserByEmail(user?.emailAddresses[0].emailAddress)
        .then((user) => {
          setallProjects(user);
          console.log("User Projects", user);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);

  React.useEffect(() => {
    console.log(selectedProject?._id);
  }, [selectedProject]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="border-2 hover:bg-white bg-white text-black">
          {selectedProject ? selectedProject?.title : " Select Project"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]  flex flex-col  md:max-w-xl w-full">
        <DialogTitle>All Projects</DialogTitle>
        {allProjects?.length > 0 && (
          <div className="grid grid-cols-4 w-full gap-x-5">
            {allProjects?.map((data: any) => (
              <div
                className={`p-2 ${
                  selectedProject?._id === data?._id ? "bg-gray-300" : ""
                } border cursor-pointer flex items-center flex-col rounded-xl p-4 `}
                key={data._id} // Ensure you have a unique key
                onClick={() => {
                  setselectedProject(data);
                  console.log("selected proj", data);
                }}
              >
                <div className="border w-fit rounded-full bg-white p-3">
                  <Code color="black" />
                </div>
                <p className="mt-4"> {data?.title}</p>
              </div>
            ))}
          </div>
        )}
        {allProjects?.length == 0 && (
          <div className="w-full text-center mt-10">
            <p>No projects found</p>
          </div>
        )}
        <DialogFooter>
          <DialogClose>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
