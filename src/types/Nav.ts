import { Role } from "./Role";

export type NavLinkType = {
  label: string;
  icon: React.ReactNode;
  href: string;
  roles: Role[];
}

export type VisibleNavLinkType = Omit<NavLinkType, "roles">;