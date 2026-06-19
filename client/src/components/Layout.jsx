import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  const location = useLocation();

  const hideNavbarRoutes = [
    "/",
    "/login",
    "/signup",
  ];

  const shouldHideNavbar =
    hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Outlet />
    </>
  );
};

export default Layout;