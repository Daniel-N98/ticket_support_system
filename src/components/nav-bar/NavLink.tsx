import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

interface NavLinkProps {
  label: string;
  icon: React.ReactNode;
  href: string;
}

export default function NavLink({ label, icon, href }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Button
      variant="ghost"
      className={`${isActive ? "bg-zinc-700 md:bg-inherit text-white font-semibold" : "text-white/50"} hover:bg-zinc-700 hover:text-white w-full flex items-center gap-4 justify-center md:justify-start text-base tracking-wide`}
      asChild
    >
      <a href={href} className="flex items-center gap-2 w-full font-bold" aria-current={isActive ? "page" : undefined}>
        {icon}
        <span className="hidden md:inline">{label}</span>
      </a>
    </Button>
  )
}