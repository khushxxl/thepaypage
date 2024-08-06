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
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");
    console.log(sessionId);

    fetch(`/api/checkout_sessions?session_id=${sessionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      const data = await res.json();
      console.log(data);
      setCustomerEmail(data?.customer_email);
      setStatus(data?.status);
    });
  }, []);

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{" "}
          {customerEmail}. If you have any questions, please email{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }

  return null;
}
