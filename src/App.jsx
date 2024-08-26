import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import HomePage from "./pages/HomePage";
import NewsList from "./pages/NewsList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/news",
        element: <NewsList />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
