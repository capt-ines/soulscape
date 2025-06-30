type NavLink = {
  label: string;
  href: string;
};

export const publicNavLinksData: NavLink[] = [
  { label: "our mission", href: "/about" },
  { label: "find inspiration", href: "/explore" },
  { label: "soulscape blog", href: "/blog" },
];

export const dashboardNavLinksData: NavLink[] = [
  { label: "mockups", href: "/dashboard/mockups" },
  { label: "journals", href: "/dashboard/journals" },
  { label: "affirmations", href: "/dashboard/affirmations" },
  { label: "soulscapes", href: "/dashboard/soulscapes" },
];
