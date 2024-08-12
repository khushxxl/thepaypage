"use client";
import React, { useContext, useState, useEffect, useCallback } from "react";
import { AppContext } from "../context/AppContext";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import ColorPicker from "react-pick-color";
import LeftSideBar from "./LeftSideBar";
import { gradeintColors } from "@/lib/utils";
import { ChevronDown, MenuIcon } from "lucide-react";
import { Switch } from "./ui/switch";
import { UploadButton, useUploadThing } from "@/lib/uploadthing";
import Image from "next/image";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { error } from "console";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmailSettingsOption } from "./EmailSettingsOption";
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
    showBranding,
    setshowBranding,
    showEmailEditor,
    setshowEmailEditor,
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
    "bg-[#FBE7F3]",
  ];

  useEffect(() => {
    setformData(selectedProject);
  }, [selectedProject]);
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      alert("uploaded successfully!");
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
    onUploadBegin: () => {
      alert("upload has begun");
    },
  });

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

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

  const [optionSelected, setoptionSelected] = useState<
    "project settings" | "email automation"
  >("project settings");

  const OptionSelector = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className=" ring-0 focus:ring-0 focus:outline-none">
          <h1 className="font-bold flex items-center text-lg text-center lg:text-left">
            {optionSelected} <ChevronDown className="ml-5" />
          </h1>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              setshowEmailEditor(false);

              setoptionSelected("project settings");
            }}
          >
            project settings
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setoptionSelected("email automation");
              setshowEmailEditor(true);
            }}
          >
            email automation
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

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
    if (selectedProject) {
      try {
        const updatedProject = await updateProjectById(
          selectedProject?._id,
          formData
        );
        console.log("Updated Project:", updatedProject);
      } catch (error) {
        console.error("Error updating project:", error);
      }
    } else {
      toast.error("Select & edit a project to continue ");
    }
  };

  const ProjectSettingsOption = () => {
    return (
      <form
        onSubmit={handleUpdateProject}
        className="space-y-5  w-full"
        action=""
      >
        <div className=" mt-5">
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

        <div className="flex items-center space-x-2">
          <Switch
            onCheckedChange={() => {
              setshowBranding(!showBranding);
            }}
            checked={showBranding}
            id="airplane-mode"
          />
          <Label htmlFor="airplane-mode">Show thepaypage branding</Label>
        </div>

        <div className="w-full justify-center space-y-5 flex flex-col  ">
          <h1 className="font-bold text-md text-center lg:text-left">
            your brand logo
          </h1>

          {selectedProject && (
            <div className="w-full mt-5 flex items-center justify-center">
              <Image
                alt=""
                width={100}
                height={100}
                src={selectedProject?.logo}
                className="rounded-2xl"
              />
            </div>
          )}
          {selectedProject && (
            <UploadButton
              endpoint="imageUploader"
              onUploadBegin={() => {}}
              onClientUploadComplete={async (res) => {
                await updateProjectById(selectedProject?._id, {
                  logo: res[0].url,
                })
                  .then(() => {
                    setselectedProject((prevProject: any) => ({
                      ...prevProject, // Spread the previous project data
                      logo: res[0].url, // Update only the logo field
                    }));
                    return toast.success(
                      "Your image has been uploaded successfully"
                    );
                  })
                  .catch((error) => {
                    alert(error);
                  });
                // Do something with the response
                console.log("Files: ", res[0].url);
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          )}
        </div>

        <button type="submit" className="border-2 px-2 p-1 text-sm rounded">
          Save & Update
        </button>
      </form>
    );
  };

  return (
    <div className="lg:w-full flex items-start  flex-col h-full pl-10 ">
      <div className="flex items-center text-sm w-full rounded-md max-w-xs justify-evenly mt-5">
        <div className=" max-w-[300px] w-full h-full  flex-col flex items-start justify-start  mt-2">
          <OptionSelector />

          {optionSelected == "project settings" ? (
            <ProjectSettingsOption />
          ) : (
            <EmailSettingsOption />
          )}
        </div>
      </div>
    </div>
  );
}

export default RightBar;
