import React from "react";
import { Box } from "@mui/material"
import Sidebar from "./components/Sidebar"
import Products from "./pages/Products"

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Products />
    </Box>
  )
}

export default App
