import { Role } from "./Roles";

export type NavLinkType = {
  label: string;
  icon: React.ReactNode;
  href: string;
  roles: Role[];
}

export interface VisibleNavLinkType {
  label: string;
  icon: React.ReactNode;
  href: string;
}