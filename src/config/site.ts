export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Vite + NextUI",
  description:
    "Make beautiful websites regardless of your design experience.",
  navItems: [],
  navMenuItems: [
    {
      label: "Login",
      href: "/auth",
    },
  ],
  navMenuItemsHidden: [
    {
      label: "emails",
      href: "/emails",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/Xanazf/compassway-test",
  },
};
