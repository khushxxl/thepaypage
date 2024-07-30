import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dot, PlusIcon } from "lucide-react";
import confetti from "canvas-confetti";

import { useState } from "react";
import Spinner from "react-activity/dist/Spinner";
import "react-activity/dist/Spinner.css";
import toast from "react-hot-toast";

export function CreateProjectDialog() {
  const [isProjectCreated, setisProjectCreated] = useState(false);
  const [loading, setloading] = useState(false);

  const initialData = {
    title: "",
    stripePublicKey: "",
    stripeSecretKey: "",
    userEmail: "khush@gmail.com",
    tagline: "",
    logo: "",
    test: "onlytest",
  };

  const [formData, setformData] = useState(initialData);

  const handleChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;

    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formData);

    setloading(true);

    const res = await fetch("/api/createProject", {
      method: "POST",
      body: JSON.stringify({ formData }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      setloading(false);
      return toast.error("Failed to add Project");
    }
    toast.success("Project created");
    handleConffetiClick(e);
    console.log("Project added");
  };

  const handleConffetiClick = (e: any) => {
    e.preventDefault();
    setTimeout(() => {
      setloading(false);
      setisProjectCreated(true);
      const end = Date.now() + 2 * 1000;
      const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

      const frame = () => {
        if (Date.now() > end) return;

        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          startVelocity: 60,
          origin: { x: 0, y: 0.5 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          startVelocity: 60,
          origin: { x: 1, y: 0.5 },
          colors: colors,
        });

        requestAnimationFrame(frame);
      };

      frame();
    }, 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" bg-pink-500">Create a new project</Button>
      </DialogTrigger>
      {!isProjectCreated ? (
        <DialogContent className="sm:max-w-[425px] flex flex-col  md:max-w-xl w-full">
          <DialogHeader>
            <DialogTitle>Create a new Project</DialogTitle>
            <DialogDescription>Enter Project Details</DialogDescription>
          </DialogHeader>
          <form action="">
            <div className="mt-5">
              <Label htmlFor="name" className="text-right">
                Name your project
              </Label>
              <Input
                name="title"
                onChange={handleChange}
                value={formData?.title}
                id="name"
                className="mt-2"
                placeholder="Enter here"
              />
            </div>
            <div className="mt-5">
              <Label htmlFor="pkey" className="text-right">
                Enter Stripe Public Key
              </Label>
              <Input
                onChange={handleChange}
                value={formData?.stripePublicKey}
                id="pkey"
                className="mt-2"
                placeholder="Enter here"
                name="stripePublicKey"
              />
            </div>
            <div className="mt-5">
              <Label htmlFor="skey" className="text-right">
                Enter Stripe Secret Key
              </Label>
              <Input
                onChange={handleChange}
                value={formData?.stripeSecretKey}
                id="sjey"
                className="mt-2"
                placeholder="Enter here"
                name="stripeSecretKey"
              />
            </div>
            <div className="flex w-full justify-end mt-10">
              <Button onClick={handleSubmit} type="submit">
                Done
              </Button>
            </div>
          </form>
          {loading && (
            <div className="flex items-center w-full justify-center mt-10">
              <Spinner size={20} color="black" />
            </div>
          )}
        </DialogContent>
      ) : (
        <DialogContent className="sm:max-w-[425px] flex flex-col  md:max-w-xl w-full">
          <DialogHeader>
            <DialogTitle>
              Your project has been successfully created
            </DialogTitle>
            <DialogDescription>Click below to close</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose>
              <Button onClick={() => setisProjectCreated(false)} type="submit">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
