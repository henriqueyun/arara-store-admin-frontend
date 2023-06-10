import React from "react";
import { Products, NotFound } from "./pages";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PageElement element={<Products />} />,
    },
    {
        path: "/products",
        element: <PageElement element={<Products />} />,
    },
    {
        path: "/*",
        element: <PageElement element={<NotFound />} />,
    }
]);

function PageElement({ element }) {
    return (element);
}

export default router;