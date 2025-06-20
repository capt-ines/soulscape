type NavLink = {
  label: string;
  href: string;
};

export const publicNavLinksData: NavLink[] = [
  { label: "Our mission", href: "/about" },
  { label: "Find inspiration", href: "/explore" },
  { label: "Soulscape blog", href: "/blog" },
];

export const dashboardNavLinksData: NavLink[] = [
  { label: "Journals", href: "/dashboard/journals" },
  { label: "Affirmations", href: "/dashboard/affirmations" },
  { label: "Soulscapes", href: "/dashboard/soulscapes" },
  { label: "Mockups", href: "/dashboard/mockups" },
];
