"use client";
import React, { useState } from "react";

export const AppContext = React.createContext();

function AppContextProvider({ children }) {
  const [newProjectName, setnewProjectName] = useState("");
  return (
    <AppContext.Provider value={{ newProjectName, setnewProjectName }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
