import {
  MoreVertical,
  ChevronLast,
  ChevronFirst
} from "lucide-react";
import { createContext, useState, ReactNode } from "react";
import logo from '../assets/logo.png';

type SidebarContextType = {
  expanded: boolean;
};

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined); 

type SidebarProps = {
  children: ReactNode;
};

export default function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);

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
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt="User Avatar"
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`  
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
            `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}