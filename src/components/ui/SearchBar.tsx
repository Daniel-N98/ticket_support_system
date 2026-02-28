import { Search } from "lucide-react";
import { Input } from "./input";

export default function SearchBar({ placeholder }: { placeholder: string }) {

  return (
    <div className="relative w-full lg:w-full xl:w-1/4 mt-3">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white pointer-events-none" size={18} />

      <Input
        placeholder={placeholder}
        onChange={(e) => { }}
        className="w-full bg-main-secondary border-0 text-white/70 dark:text-zinc-50 h-12 pl-10"
      />
    </div>
  )
}