import { Outlet } from "react-router-dom";
import NavBottom from "../components/NavBottom";
import { Divider } from "@mui/material";

function Layout() {
  return (
    <>
      <NavBottom />
      <Divider />
      <Outlet />
    </>
  );
}

export default Layout;
