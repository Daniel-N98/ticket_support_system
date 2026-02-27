import NavLinks from "./NavLinks";

export default function NavBar() {

  return (
    <aside className="w-full md:w-64 bg-main-secondary px-6 py-4 md:py-9 flex flex-col border-b border-white/30 md:border-0">
      <div className="flex flex-col mb-8 space-y-1 items-center md:items-start">
        <h1>
          <a href="/dashboard" className="text-2xl font-bold text-zinc-50 md:pl-4">
            <span className="text-blue-400">Ticket</span>
            System</a>
        </h1>
      </div>
      <nav className="flex flex-col justify-between h-full mt-2 md:mt-8">
        <NavLinks />
      </nav>
    </aside>
  );
}