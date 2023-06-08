import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
