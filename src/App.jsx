import React from 'react';
import { Box } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import router from './router';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <RouterProvider router={router} />
      </Box>
    </AuthProvider>
  );
}

export default App;
