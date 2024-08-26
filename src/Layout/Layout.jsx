import { Outlet } from "react-router-dom";
import NavBottom from "../components/NavBottom";

function Layout() {
  return (
    <>
      <NavBottom />
      <Outlet />
    </>
  );
}

export default Layout;
