import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const codeText = `
    const postData = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3003/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: "66a7daa1a659e92f83cdc852",
          testAmount: 10,
        }),
      });
      const result = await response.json();
      console.log(result);
       if (result.success) {
        router.push("http://localhost:3003/checkoutPage");
      }
      console.log("Server response:", result);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };
`;

export const gradeintColors = [
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
];

export const instructions = [
  {
    title: "Create a New Project",
    desc: "Create a new project by adding your project & stripe details, and boom your page is actually ready!",
  },
  {
    title: "Style your page",
    desc: "You can do additional styling to your page and integrate your brand colors and text!",
  },
  {
    title: "Copy & Paste",
    desc: "Just copy the provided POST function in your code and your stripe is working!",
  },
];

export const descCopy = `Integrating payments has always been a problem 😮‍💨, 
  now integrate stripe with just no / few lines of code, no more api 
or webhook calls! Just that? No. Get a customizable page which you can
 design with our no-code designer and easily integrat into your projects 🪄`;

export const descCopy2 = `
 Effortlessly integrate Stripe with minimal or no code 😮‍💨.
   No API hassles, no webhook headaches.
   Plus, design and customize your payment pages with our no-code designer to fit 
   seamlessly into your projects. Start now and transform how you manage payments! 🪄`;
