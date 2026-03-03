import { Ghost, X } from "lucide-react";
import Link from "next/link";

export default function BannedAccountPage() {
  return (
    <div className="flex flex-col items-center bg-main-primary text-white w-full mt-12 md:mt-48">
      <X className="w-48 h-48 text-red-500 mb-8" />
      <h2 className="text-4xl font-bold text-center">Your account has been banned.</h2>
      <p className="mt-4">If you believe this is a mistake, contact us on the email below.</p>
      <Link href="https://Support@danielmails.com" className="mt-4 text-blue-400 underline">Support@danielmails.com</Link>
    </div>
  )
}