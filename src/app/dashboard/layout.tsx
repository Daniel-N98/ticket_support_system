import Header from "@/components/header/Header";
import NavBar from "@/components/nav-bar/NavBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { loadSiteSettings } from "@/lib/siteSettings";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // Check if the user is logged in. If they are not, redirect to /login.
  // If a user is not signed in, redirect to /login
  const session = await getServerSession(authOptions);
  const settings = await loadSiteSettings(); // Load site-settings.
  const isInLockdown = settings.every((setting) => setting.value === false);

  if (!session) {
    redirect("/login");
  } else if (session.user.status === "banned") {
    redirect("/banned");
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-main-primary text-white/90">
      {isInLockdown && (
        <div className="h-17 md:h-10 w-full bg-main-secondary fixed top-0 left-0 z-50">
          <p className="text-white text-center mt-2">The site is currently in <span className="text-red-500">lockdown mode</span>. All features are disabled. Please check back later.</p>
        </div>
      )}
      <NavBar session={session} />
      <div className="py-8 px-3 md:py-11 md:px-12 w-full md:ml-64">
        <Header />
        {children}
      </div>
    </div>
  );
}