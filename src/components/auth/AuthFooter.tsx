import Link from "next/link";

interface AuthFooterProps {
  text: string;
  linkText: string;
  href: string;
}

export function AuthFooter({ text, linkText, href }: AuthFooterProps) {
  return (
    <div className="text-center text-sm text-white/50">
      {text}{" "}
      <Link
        href={href}
        className="text-blue-400 hover:text-blue-300 transition-colors"
      >
        {linkText}
      </Link>
    </div>
  );
}