import React, { useContext } from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { createBrowserRouter, useNavigate } from 'react-router-dom';
import {
  Login,
  Products,
  NotFound,
  ProductForm,
  Showcase,
  Order,
  Orders,
} from './pages';
import { Context } from './context/AuthContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Component isPrivate variant={<Products />} />,
  },
  {
    path: '/products',
    element: <Component isPrivate variant={<Products />} />,
  },
  {
    path: '/products/:action/:id?',
    element: <Component isPrivate variant={<ProductForm />} />,
  },
  {
    path: '/orders',
    element: <Component isPrivate variant={<Orders />} />,
  },
  {
    path: '/login',
    element: <Component variant={<Login />} />,
  },
  {
    path: '/order/:id',
    element: <Component isPrivate variant={<Order />} />,
  },
  {
    path: '/showcase',
    element: <Component isPrivate variant={<Showcase />} />,
  },
  {
    path: '/*',
    element: <Component isPrivate variant={<NotFound />} />,
  },
]);

function Component({ isPrivate, variant }) {
  const navigate = useNavigate();
  const { loading, logged } = useContext(Context);
  if (loading) {
    // TODO: melhorar componente
    return (
      <Grid container my={20} justifyContent="center">
        <CircularProgress color="inherit" />
        <Typography variant="h1">Loading...</Typography>
      </Grid>
    );
  }
  if (isPrivate && !logged) {
    return navigate('/login');
  }
  return variant;
}

export default router;
