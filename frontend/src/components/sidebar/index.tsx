import { PackageSearchIcon, MenuIcon, X } from "lucide-react";
import { Menu } from "./Menu";

interface SidebarProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export const Sidebar = ({ isMenuOpen, toggleMenu }: SidebarProps) => {
  return (
    <aside className="bg-surface-bg h-full flex md:flex-col md:justify-center border-r border-border-light justify-between px-6 md:px-0">
      <h2 className="text-sm md:h-2/8 lg:text-lg font-semibold flex items-center justify-center gap-2 flex-nowrap whitespace-nowrap md:border-b md:border-border-light">
        <PackageSearchIcon className="shrink-0 w-5 h-5 md:w-6 md:h-6" />
        <span>MRP Challenge</span>
      </h2>
      <div className="md:w-full h-full md:h-4/8 flex items-center relative">
        <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <button
          className={`${isMenuOpen ? "rounded-t-lg rounded-b-none bg-brand-darkBlue text-text-inverted" : "rounded-lg text-text-title"} md:hidden h-fit w-auto p-2 hover:bg-brand-darkBlue hover:text-text-inverted`}
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </div>
      <footer className="mt-auto h-1/8 text-xs pb-2 text-gray-500 hidden md:block text-center">
        &copy; 2026 MRP Challenge by <br /> Bruno H Cardoso.
      </footer>
    </aside>
  );
};
