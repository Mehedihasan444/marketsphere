import { Outlet } from "react-router-dom";
import Header from "../Components/Shared/Header/Header";
import Footer from "../Components/Shared/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
