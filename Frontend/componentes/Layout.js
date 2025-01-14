import React from "react";
import Head from "next/head";
import MenuNav from "./MenuNav";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>AGROSOL</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      {(router.pathname === '/login' || router.pathname === '/nuevacuenta') && (
        <div className="bg-yellow-400 min-h-screen flex flex-col justify-center">
          <div>{children}</div>
        </div>
      )}
      {router.pathname !== '/login' && router.pathname !== '/nuevacuenta' && (
        <div className="bg-yellow-200 min-h-screen">
          <div className="flex min-h-screen">
            <MenuNav />
            <main className="sm:w-2/3 xl:w-4/5 sh:min-h-screen p-5">
              {children}
            </main>
          </div>
        </div>
      )}

    </>
  );
};

export default Layout;
