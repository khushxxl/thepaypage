"use client";
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import ColorPicker from "react-pick-color";
import LeftSideBar from "./LeftSideBar";
import { gradeintColors } from "@/lib/utils";
import { MenuIcon } from "lucide-react";

function RightBar() {
  const {
    selectedProject,
    setselectedProject,
    bgColor,
    setbgColor,
    textColorAccent,
    settextColorAccent,
    bannerbgColor,
    setbannerbgColor,
    hideSideBar,
    sethideSideBar,
  } = useContext(AppContext);
  const [formData, setformData] = useState(selectedProject);

  const gradeintColors = [
    "bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100",
    "bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500",
    "bg-gradient-to-r from-red-200 to-red-600",
    "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
    "bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100",
    "bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500",
    "bg-gradient-to-r from-red-200 to-red-600",
    "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
    "bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100",
    "bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500",
    "bg-gradient-to-r from-red-200 to-red-600",
    "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
    "bg-black",
    "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
  ];

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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setformData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
    setselectedProject((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProject = async (e: any) => {
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
    <div className="max-w-[480px] lg:w-full   flex items-start  flex-col h-full pl-5 pt-4">
      {/* Options  */}
      <div className="w-full flex justify-start">
        <MenuIcon
          onClick={() => sethideSideBar(true)}
          className=" cursor-pointer"
        />
      </div>
      <div className="flex items-center text-sm w-full rounded-md max-w-xs justify-evenly mt-5 bg-gray-200 p-3">
        {/* "PROJECT_DETAILS" | "BRANDING" | "CONFIG" */}
        <RightBarOptionComponent
          option={"PROJECT_DETAILS"}
          title={"Project Details"}
        />
        <RightBarOptionComponent option={"BRANDING"} title={"Branding"} />
        <RightBarOptionComponent option={"CONFIG"} title={"Config"} />
      </div>
      {rightBarOption == "PROJECT_DETAILS" && selectedProject && (
        <div className=" max-w-[300px] w-full h-full  flex items-start justify-start  mt-10">
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
              <Label htmlFor="textcolor">Text Accent Color</Label>
              <Input
                value={textColorAccent}
                onChange={(e) => {
                  console.log(e.target.value);
                  settextColorAccent(e.target.value);
                }}
                type="color"
                className=" cursor-pointer max-w-[100px]"
                name="textcolor"
              />
            </div>

            <div className="flex items-center w-full justify-between">
              <Label>Banner Background Color</Label>
              <Input
                value={bannerbgColor}
                onChange={(e) => {
                  setbannerbgColor(`bg-[${e.target.value}]`);
                }}
                type="color"
                className=" cursor-pointer max-w-[100px]"
                name="bgColor"
              />
            </div>

            <div className="">
              <Label>Banner Gradient Presets</Label>
              <div className="grid grid-cols-10">
                {gradeintColors.map((data, i) => {
                  return (
                    <div
                      onClick={() => setbannerbgColor(data)}
                      className={`h-5 w-5 mt-3 border rounded-lg  cursor-pointer ${data}`}
                      key={i}
                    ></div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center w-full  justify-between">
              <Label>Background Color</Label>
              <Input
                value={bgColor}
                onChange={(e) => {
                  setbgColor(`bg-[${e.target.value}]`);
                }}
                type="color"
                className=" cursor-pointer max-w-[100px]"
                name="bgColor"
              />
            </div>

            <div>
              <Label>Background Gradient Presets</Label>
              <div className="grid grid-cols-10">
                {gradeintColors.map((data, i) => {
                  return (
                    <div
                      onClick={() => setbgColor(data)}
                      className={`h-5 w-5 mt-3 border rounded-lg  cursor-pointer ${data}`}
                      key={i}
                    ></div>
                  );
                })}
              </div>
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
