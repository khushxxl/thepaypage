"use client";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";

function LeftSideBar() {
  const { allProjects, setallProjects, selectedProject, setselectedProject } =
    useContext(AppContext);

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

  useEffect(() => {
    getUserByEmail("khush@gmail.com")
      .then((data) => {
        setallProjects(data);
        console.log("User Projects", data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setallProjects]);

  return (
    <div className="border-r-2 w-full pl-4 pt-5">
      <div>
        {allProjects?.map((data: any) => (
          <div
            className={`p-2 ${
              selectedProject?._id === data?._id ? "bg-gray-300" : ""
            } mt-3 max-w-[250px] rounded-lg cursor-pointer`}
            key={data._id} // Ensure you have a unique key
            onClick={() => {
              setselectedProject(data);
              console.log("selected proj", data);
            }}
          >
            {data?.title}
          </div>
        ))}
      </div>
      {/* <h1>{selectedProject?._id}</h1> */}
    </div>
  );
}

export default LeftSideBar;
