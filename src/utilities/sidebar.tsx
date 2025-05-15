import {
  ChevronLast,
  ChevronFirst
} from "lucide-react";
import { createContext, useState, ReactNode } from "react";
import logo from '../assets/logo.png';
import { SidebarItem } from "./sidebaritem";
import { LogOut } from "lucide-react";

type SidebarContextType = {
  expanded: boolean;
};

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

type SidebarProps = {
  children: ReactNode;
};

export default function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/";
  };

 return (
    <aside className={`h-screen transition-all duration-300 ${expanded ? "w-64" : "w-18"}`}>
      <nav className="h-full flex flex-col bg-white shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={logo}
            className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
            alt="Logo"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className={`${expanded ? "w-20 h-10" : "w-10 h-10"}
      flex items-center justify-center rounded-md !bg-blue-300 text-blue-800 hover:!bg-blue-400 focus:outline-none focus:ring-0 transition-all duration-200`}
          >
            {expanded ? <ChevronFirst size={24} /> : <ChevronLast size={28} />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
          {/* Línea que ya estaba antes, no la quites */}
          <hr className="border-t border-black-200 mx-3 my-2" />
          <ul className="px-3 mt-auto mb-2">
            <SidebarItem icon={<LogOut />} text="Cerrar sesión" onClick={handleLogout} />
          </ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}