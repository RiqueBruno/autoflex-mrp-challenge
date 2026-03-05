import { PackageSearchIcon } from "lucide-react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <aside className="bg-surface-bg p-4 h-full flex md:flex-col md:gap-4 border-r border-border-light justify-around">
      <h2 className="text-sm lg:text-lg font-semibold flex items-center gap-2 mb-4 flex-nowrap whitespace-nowrap">
        <PackageSearchIcon className="shrink-0 w-5 h-5 md:w-6 md:h-6" />
        <span>MRP Challenge</span>
      </h2>
      <nav>
        <ul>
          <li>
            <Link to="/" className="text-blue-500 hover:underline">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/products" className="text-blue-500 hover:underline">
              Products
            </Link>
          </li>
          <li>
            <Link to="/raw-materials" className="text-blue-500 hover:underline">
              Raw Materials
            </Link>
          </li>
        </ul>
      </nav>
      <footer className="mt-auto text-sm text-gray-500">
        &copy; 2026 MRP Challenge
      </footer>
    </aside>
  );
};
