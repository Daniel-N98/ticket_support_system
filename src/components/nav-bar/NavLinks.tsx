"use client";

import { Home, Users, LogOut, MessageCircle, NotepadText, Settings } from "lucide-react";
import NavLink from "./NavLink";
import { NavLinkType, VisibleNavLinkType } from "@/types/Nav";

export default function NavLinks() {

  const navItems: NavLinkType[] = [
    { label: "Dashboard", icon: <Home className="h-4 w-4 text-blue-400" />, href: "/dashboard", roles: ["admin", "agent"] },
    { label: "Tickets", icon: <NotepadText className="h-4 w-4 text-blue-400" />, href: "/dashboard/tickets", roles: ["admin", "agent", "user"] },
    { label: "Inbox", icon: <MessageCircle className="h-4 w-4 text-blue-400" />, href: "/dashboard/inbox", roles: ["admin", "agent", "user"] },
    { label: "Team", icon: <Users className="h-4 w-4  text-blue-400" />, href: "/dashboard/team", roles: ["admin", "agent"] },
    { label: "Settings", icon: <Settings className="h-4 w-4 text-blue-400" />, href: "/dashboard/settings", roles: ["admin"] },
  ];

  // Filter NavLinks to only return links that the user has access to, map out the roles from the returned element.
  const visbleNavItems: VisibleNavLinkType[] = navItems.filter((navItem: NavLinkType) => navItem.roles.includes("admin")).map(({ roles, ...rest }: NavLinkType) => rest);

  return (
    <>
      <div className="flex flex-row md:flex-col gap-2 md:gap-6 overflow-x-auto md:overflow-visible">
        {visbleNavItems.map((item: VisibleNavLinkType) => (
          <NavLink key={item.label + item.href} label={item.label} href={item.href} icon={item.icon} />
        ))}
      </div>
      <div className="space-y-4">
        <NavLink label="Sign Out" href="/sign-out" icon={<LogOut className="w-4 h-4 text-red-400" />} />
      </div>
    </>
  )
}