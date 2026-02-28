"use client";

import { Users, LogOut, MessageCircle, NotepadText, Settings, HomeIcon } from "lucide-react";
import NavLink from "./NavLink";
import { NavLinkType, VisibleNavLinkType } from "@/types/Nav";
import { createIcon } from "@/utils/createIcon";
import { signOut, useSession } from "next-auth/react";
import { Role } from "@/types/Role";

export default function NavLinks() {

  const navItems: NavLinkType[] = [
    { label: "Dashboard", icon: createIcon(HomeIcon), href: "/dashboard", roles: ["admin", "agent"] },
    { label: "Tickets", icon: createIcon(NotepadText), href: "/dashboard/tickets", roles: ["admin", "agent", "user"] },
    { label: "Inbox", icon: createIcon(MessageCircle), href: "/dashboard/inbox", roles: ["admin", "agent", "user"] },
    { label: "Team", icon: createIcon(Users), href: "/dashboard/team", roles: ["admin", "agent"] },
    { label: "Settings", icon: createIcon(Settings), href: "/dashboard/settings", roles: ["admin"] },
  ];

  const { data: session, status } = useSession();
  if (status === "loading") return null;

  const userRole: Role | undefined = session?.user.role as Role || "user";
  
  // Filter NavLinks to only return links that the user has access to, map out the roles from the returned element.
  const visibleNavItems: VisibleNavLinkType[] = navItems
    .filter(navItem => navItem.roles.includes(userRole))
    .map(({ roles, ...rest }) => rest);

  return (
    <>
      <div className="flex flex-row md:flex-col gap-2 md:gap-6 overflow-x-auto md:overflow-visible">
        {visibleNavItems.map(({ label, href, icon }) => (
          <NavLink key={href} label={label} href={href} icon={icon} />
        ))}
      </div>
      <div className="space-y-4">
        <NavLink label="Sign Out" href="/sign-out" icon={<LogOut className="w-4 h-4 text-red-400" />} clickEvent={signOut} />
      </div>
    </>
  )
}