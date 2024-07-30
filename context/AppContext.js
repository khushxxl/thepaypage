"use client";
import React, { useState } from "react";

export const AppContext = React.createContext();

function AppContextProvider({ children }) {
  const [newProjectName, setnewProjectName] = useState("");
  const [allProjects, setallProjects] = useState([]);
  const [selectedProject, setselectedProject] = useState();

  const [bgColor, setbgColor] = useState("#fff");
  return (
    <AppContext.Provider
      value={{
        newProjectName,
        setnewProjectName,
        allProjects,
        setallProjects,
        selectedProject,
        setselectedProject,
        bgColor,
        setbgColor,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;

// {
//     _id: "66a7daa1a659e92f83cdc852",
//     title: "Khush Test 01",
//     stripePublicKey:
//       "pk_test_51PhlYaCRmGYjmhYknvmoWqVEvQsndGH1eBtgfZliaJyBsQWOjcOXLL6WXkpvEPPH5OkclqQRRianGFYwP5nepciI00EfRXPnjJ",
//     stripeSecretKey:
//       "sk_test_51PhlYaCRmGYjmhYk1qKnkwn1zAK6Ba9FZ52rOsmy3PGbcuofbKzSsXnOHAvDGLIunjPNxVefAIDeMOHCEqXQack600Q7J2IHKM",
//     userEmail: "khush@gmail.com",
//     createdAt: "2024-07-29T18:08:33.136Z",
//     logo: "",
//     tagline: "This is literally for test",
//   }
