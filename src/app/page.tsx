import { redirect } from "next/navigation";

export default function Home() {
  // If a user is not signed in, redirect to /login
  const signedIn: boolean = false;
  redirect(signedIn ? "/dashboard" : "/login");
}
