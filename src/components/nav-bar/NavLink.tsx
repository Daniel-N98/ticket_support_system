import { Button } from "../ui/button";
import { NavLinkType } from "./NavLinks";

export default function NavLink({ label, icon, href }: NavLinkType) {

  return (
    <Button
      key={label}
      variant="ghost"
      className="flex items-center gap-4 justify-center md:justify-start text-md tracking-wide text-white/50 hover:bg-zinc-700 hover:text-white"
      asChild
    >
      <a href={href} className="flex items-center gap-2 w-full">
        {icon}
        <span className="hidden md:inline">{label}</span>
      </a>
    </Button>
  )
}