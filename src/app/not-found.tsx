import { Ghost } from "lucide-react";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center bg-main-primary text-white w-full mt-24 md:mt-48">
      <Ghost className="w-48 h-48 text-blue-400 mb-8" />
      <h2 className="text-4xl font-bold">Page Not Found</h2>
      <p className="mt-4">What are you looking for?</p>
      <Link href="/dashboard" className="mt-6 text-blue-400 underline">
        Return Home
      </Link>
    </div>
  )
}