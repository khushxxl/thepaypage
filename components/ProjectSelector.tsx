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

export function ProjectSelector() {
  const { allProjects, setallProjects, selectedProject, setselectedProject } =
    React.useContext(AppContext);

  async function getUserByEmail(email: string) {
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

  React.useEffect(() => {
    getUserByEmail("khush@gmail.com")
      .then((user) => {
        setallProjects(user);
        console.log("User Projects", user);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  React.useEffect(() => {
    console.log(selectedProject?._id);
  }, [selectedProject]);

  return (
    <Select>
      <SelectTrigger className="w-[180px] outline-none focus:outline-none">
        <SelectValue placeholder="Select a Project" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Projects</SelectLabel>
          {allProjects?.map((data: any) => (
            <SelectItem
              key={data._id} // Ensure you have a unique key
              onClick={() => {
                setselectedProject(data);
                console.log("selected proj", data);
              }}
              value={data}
            >
              {data?.title}
            </SelectItem>
          ))}
          <h1>{selectedProject?._id}</h1>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
