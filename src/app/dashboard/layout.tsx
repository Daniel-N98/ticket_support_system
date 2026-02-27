import Header from "@/components/header/Header";
import NavBar from "@/components/nav-bar/NavBar";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // Check if the user is logged in. If they are not, redirect to /login.
  // If a user is not signed in, redirect to /login
  const signedIn: boolean = false;
  if (!signedIn) redirect("/login");
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-main-primary text-white/90">
      <NavBar />
      <div className="py-8 px-8 md:py-11 md:px-12 w-full">
        <Header />
        {children}
      </div>
    </div>
  );
}