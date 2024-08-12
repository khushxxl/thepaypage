"use client";
import React, { useContext, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { AppContext } from "@/context/AppContext";

export default function Return() {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const { selectedProject } = useContext(AppContext);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const sessionId = urlParams.get("session_id");
  console.log(sessionId);
  // console.log(selectedProject);
  const [isPaymentComplete, setisPaymentComplete] = useState<boolean>();
  const [isPaymentOpen, setisPaymentOpen] = useState<boolean>();
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");
    const projectId = urlParams.get("project_id");
    console.log(projectId);

    fetch(
      `/api/checkout_sessions?session_id=${sessionId}&project_id=${projectId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(async (res) => {
      const data = await res.json();
      console.log(data);
      setCustomerEmail(data?.customer_email);
      setStatus(data?.status);
      if (data?.status === "paid" || data?.status === "completed") {
        setisPaymentComplete(true);
      }
      if (data?.status === "open") {
        setisPaymentOpen(true);
      }
    });
  }, []);

  if (isPaymentOpen) {
    return redirect("/");
  }

  if (isPaymentComplete) {
    return (
      <section
        className="h-screen flex items-center justify-center"
        id="success"
      >
        <p className="max-w-4xl text-center">
          We appreciate your business! A confirmation email will be sent to{" "}
          {customerEmail}. If you have any questions, please email{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }

  return null;
}
