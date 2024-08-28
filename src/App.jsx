import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import HomePage from "./pages/HomePage";
import SingleNews from "./pages/SingleNews";
import AudioList from "./pages/AudioList";
import Error404 from "./components/Error404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        errorElement: <Error404 />,
      },
      {
        path: "/singleNews",
        element: <SingleNews />,
        errorElement: <Error404 />,
      },
      {
        path: "/audioList",
        element: <AudioList />,
        errorElement: <Error404 />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
