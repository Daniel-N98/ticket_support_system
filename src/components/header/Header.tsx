import BreadcrumbsHeader from "./breadcrumbs/Breadcrumbs";
import HeaderButtons from "./buttons/HeaderButtons";

export default function Header() {

  return (
    <header className="flex justify-between items-center px-2 md:px-6 -mt-3">
      <BreadcrumbsHeader />
      <div className="hidden md:flex">
        <HeaderButtons />
      </div>
    </header>
  );
}