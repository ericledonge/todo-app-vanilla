import { ReactNode } from "react";

import { Nav } from "../nav";
import { Footer } from "../footer";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <header>
        <Nav />
      </header>

      <main>{children}</main>

      <Footer />
    </>
  );
};
