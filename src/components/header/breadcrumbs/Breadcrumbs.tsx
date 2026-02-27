"use client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

type BreadcrumbNameMappingsType = {
  [key: string]: string;
}

const BREADCRUMB_NAME_MAPPINGS: BreadcrumbNameMappingsType = {
  "dashboard": "Dashboard",
  "tickets": "Tickets",
  "inbox": "Inbox",
  "team": "Team",
  "settings": "Settings",
}
export default function BreadcrumbsHeader() {
  const currentPage: string = usePathname();
  const pages: Array<string> = currentPage.split("/").filter((page: string) => page);

  return (
    <Breadcrumb>
      <BreadcrumbList className="relative top-[0.7px]">
        {pages.map((page: string, index: number) => {
          const isLast: boolean = index === pages.length - 1;
          const href: string = "/" + pages.slice(0, index + 1).join("/");
          const label: string = resolveBreadcrumbLabel(page, pages, index);

          return (
            <div key={href} className="flex items-center gap-2">
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="text-blue-400">
                    {label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href} className="mr-1">
                    {label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function resolveBreadcrumbLabel(page: string, pages: string[], index: number): string {
  // Page exists in mapping, return this.
  if (BREADCRUMB_NAME_MAPPINGS[page]) {
    return BREADCRUMB_NAME_MAPPINGS[page];
  }

  // Get the parent page.
  const parent = pages[index - 1];

  if (parent === "tickets") {
    return `#${page}`;
  }

  if (parent === "inbox") {
    return page.replace(/-/g, " ");
  }

  if (parent === "team") {
    return page.replace(/-/g, " ");
  }

  return page.replace(/-/g, " ");
}