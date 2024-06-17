import { ReactElement } from "react";

import NavPanel from "@components/NavPanel/NavPanel";
import ThemeProvider from "@components/ThemeProvider/ThemeProvider";
import { Outlet } from "react-router";

import Header from "../Header/Header";

function Layout(): ReactElement {
  return (
    <ThemeProvider>
      <Header />
      <NavPanel />
      <main>
        <Outlet />
      </main>
    </ThemeProvider>
  );
}

export default Layout;
