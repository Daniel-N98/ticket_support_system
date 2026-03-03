import Header from "@/components/header/Header";
import NavBar from "@/components/nav-bar/NavBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // Check if the user is logged in. If they are not, redirect to /login.
  // If a user is not signed in, redirect to /login
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  } else if (session.user.status === "banned") {
    redirect("/banned");
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-main-primary text-white/90">
      <NavBar session={session} />
      <div className="py-8 px-3 md:py-11 md:px-12 w-full md:ml-64">
        <Header />
        {children}
      </div>
    </div>
  );
}