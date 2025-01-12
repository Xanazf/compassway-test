import { Link } from "@nextui-org/link";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { useState, useEffect } from "react";

import { siteConfig } from "@src/config/site";
import { ThemeSwitch } from "@components/theme-switch";
import {
  GithubIcon,
  EmailIcon,
  LoginIcon,
  LogoutIcon,
} from "@components/icons";
import { Logo } from "@components/icons";
import { useLogin } from "@src/hooks/login-state";

export const Navbar = () => {
  const [loginState, setLoginState] = useState<boolean>(false);

  const loginUtil = useLogin();

  useEffect(() => {
    setLoginState(loginUtil.isLoggedIn);
  }, [loginUtil.isLoggedIn]);

  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent
        className="basis-1/5 sm:basis-full"
        justify="start"
      >
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <Logo />
            <p className="font-bold text-inherit">Compassway</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link
            isExternal
            href={siteConfig.links.github}
          >
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
          {loginState && (
            <Link
              href="/emails"
              className="text-primary gap-1"
            >
              <EmailIcon />
              Emails
            </Link>
          )}
          {!loginState ? (
            <Link
              href="/auth"
              className="text-success-500 gap-1"
            >
              <LoginIcon />
              Login
            </Link>
          ) : (
            <Link
              href="/"
              className="text-danger-500 gap-1"
              onClick={loginUtil.logout}
            >
              <LogoutIcon />
              Logout
            </Link>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        className="sm:hidden basis-1 pl-4"
        justify="end"
      >
        <Link href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>

        <ThemeSwitch />
        {loginState && (
          <Link
            href="/emails"
            className="text-primary gap-1"
          >
            <EmailIcon />
          </Link>
        )}
        {!loginState ? (
          <Link
            href="/auth"
            className="text-success-500 gap-1"
          >
            <LoginIcon />
          </Link>
        ) : (
          <Link
            className="text-danger-500 gap-1"
            onClick={loginUtil.logout}
          >
            <LogoutIcon />
          </Link>
        )}
      </NavbarContent>
    </NextUINavbar>
  );
};
