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
