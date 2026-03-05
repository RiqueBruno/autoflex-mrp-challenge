import { HomeIcon, Layers, Package } from "lucide-react";
import { NavLink } from "react-router-dom";

interface MenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const NAV_LINKS = [
  { path: "/", label: "Dashboard", icon: HomeIcon },
  { path: "/product", label: "Products", icon: Package },
  { path: "/raw-material", label: "Raw Materials", icon: Layers },
];

export const Menu = ({ isMenuOpen, toggleMenu }: MenuProps) => {
  return (
    <div className=" absolute md:relative w-max md:w-full h-full z-50 top-20 right-0">
      <nav
        className={`
          ${isMenuOpen ? "block bg-surface-bg border-2 border-t-0 border-border-light h-max md:border-none" : "hidden"} 
          md:block transition-all duration-300 h-full
        `}
      >
        <ul className="flex flex-col gap-4">
          {NAV_LINKS.map(({ path, label, icon: Icon }) => (
            <li key={`${path}-link`}>
              <NavLink
                to={path}
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `py-2 p-4 flex items-center font-medium transition-colors w-full ${
                    isActive
                      ? "bg-brand-darkBlue text-text-inverted"
                      : "text-text-main hover:bg-brand-darkBlue hover:text-text-inverted"
                  }`
                }
              >
                <Icon className="w-5 h-5 mr-2" />
                {label}
              </NavLink>
            </li>
          ))}
          <li className="text-xs pb-2 text-gray-500 p-4 text-center md:hidden">
            &copy; 2026 MRP Challenge by <br /> Bruno H Cardoso.
          </li>
        </ul>
      </nav>
    </div>
  );
};
