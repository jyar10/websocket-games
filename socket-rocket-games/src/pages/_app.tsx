import "../styles/globals.css";
import type { AppProps } from "next/app";
// import { ThemeProvider } from "next-themes";
import { MenuHeader } from "@/components/menu-header";
import { Footer } from "@/components/footer";
import React, { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

// type ComponentWithPageLayout = AppProps & {
//   Component: AppProps["Component"] & {
//     PageLayout?: React.ComponentType;
//   };
// };

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <header>
        <MenuHeader />
      </header>
      {getLayout(<Component {...pageProps} />)}
      <footer>
        <Footer />
      </footer>
    </>
  );
}
