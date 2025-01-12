import { Link } from "@nextui-org/link";
import { useEffect } from "react";

import { Navbar } from "@components/navbar";
import { useLogin } from "@src/hooks/login-state";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const loginUtil = useLogin();
  useEffect(() => {
    if (!loginUtil.isLoggedIn) {
      window.location.assign("/auth");
    }
  }, [loginUtil.isLoggedIn]);
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://xanazf.github.io"
          title="Xanazf website"
        >
          <span className="text-default-600">Made by</span>
          <p className="text-primary">Xanazf</p>
        </Link>
      </footer>
    </div>
  );
}
