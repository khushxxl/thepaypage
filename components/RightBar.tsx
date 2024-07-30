"use client";
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import ColorPicker from "react-pick-color";

function RightBar() {
  const { selectedProject, setselectedProject, bgColor, setbgColor } =
    useContext(AppContext);
  const [formData, setformData] = useState(selectedProject);

  useEffect(() => {
    setformData(selectedProject);
  }, [selectedProject]);

  const [rightBarOption, setrightBarOption] = useState<
    "PROJECT_DETAILS" | "BRANDING" | "CONFIG"
  >("PROJECT_DETAILS");

  async function updateProjectById(id: string, updateData: any) {
    const response = await fetch(
      `/api/updateProjectById?id=${encodeURIComponent(id)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update project");
    }

    const result = await response.json();
    return result;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setselectedProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    try {
      const updatedProject = await updateProjectById(
        selectedProject?._id,
        formData
      );
      console.log("Updated Project:", updatedProject);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const RightBarOptionComponent = ({
    option,
    title,
  }: {
    option: any;
    title: string;
  }) => {
    return (
      <div onClick={() => setrightBarOption(option)}>
        <div
          className={`${
            rightBarOption == option && "bg-gray-300"
          } cursor-pointer p-[5px] rounded font-bold`}
        >
          {title}
        </div>
      </div>
    );
  };
  return (
    <div className="border-l-2  w-full flex items-center  flex-col h-full pl-2 pt-4">
      {/* Options  */}
      <div className="flex items-center text-sm w-full rounded-md max-w-xs justify-evenly mt-5 bg-gray-200 p-3">
        {/* "PROJECT_DETAILS" | "BRANDING" | "CONFIG" */}
        <RightBarOptionComponent
          option={"PROJECT_DETAILS"}
          title={"Project Details"}
        />
        <RightBarOptionComponent option={"BRANDING"} title={"Branding"} />
        <RightBarOptionComponent option={"CONFIG"} title={"Config"} />
      </div>

      {rightBarOption == "PROJECT_DETAILS" && (
        <div className=" max-w-[300px] w-full  flex items-start justify-start  mt-10">
          <form
            onSubmit={handleUpdateProject}
            className="space-y-5 max-w-[280px] w-full"
            action=""
          >
            <div className="">
              <Label>Enter Project Name</Label>
              <Input
                name="title"
                placeholder="Enter here"
                className="mt-2"
                onChange={handleChange}
                value={formData?.title || ""}
              />
            </div>

            <div className="">
              <Label>Enter Project Name</Label>
              <Input
                name="tagline"
                placeholder="Enter here"
                className="mt-2 "
                onChange={handleChange}
                value={formData?.tagline || ""}
              />
            </div>

            <div className="flex items-center w-full justify-between">
              <Label>Background Color</Label>
              <Input
                value={bgColor}
                onChange={(e) => {
                  setbgColor(e.target.value);
                }}
                type="color"
                className=" cursor-pointer max-w-[100px]"
                name="bgColor"
              />
            </div>

            <button type="submit" className="border-2 px-2 p-1 text-sm rounded">
              Save & Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default RightBar;
