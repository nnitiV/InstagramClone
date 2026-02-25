import { handleLogout } from "@/feature/auth/services/auth-service";
import Link from "next/link";
import { ReactNode } from "react";
import SearchOffset from "./SearchOffset";
import NotificationsOffset from "./NotificationsOffset";
import SidebarItem from "./SidebarItem";

export default function Sidebar({ children, picture }: { children: ReactNode, picture: string }) {
  const SIDEBAR_LINKS = [
  { url: "/", icon: "house", text: "Home",target: ""  },
  { url: "/reels", icon: "camera-reels", text: "Reels",target: ""  },
  { url: "/messages", icon: "chat-right", text: "Messages",target: ""  },
  { url: "#", icon: "search", text: "Search", target: "searchOffcanvas" },
  { url: "/explore", icon: "compass", text: "Explore",target: "" },
  { url: "/notifications", icon: "heart", text: "Notifications", target: "notificationsOffset" },
  { url: "#", icon: "plus-square", text: "Create",target: ""  },
  { url: "/profile", icon: "person-circle", text: "Profile",target: ""  },
];
  return (
    <div className="d-flex vh-100 overflow-hidden">
      <div
        className="d-flex flex-column justify-content-between flex-shrink-0 bg-white shadow-sm px-2 py-3"
        style={{width: "fit-content"}}
      >
        <Link href="/" className="transparent-background-hover d-flex align-items-center me-md-auto text-dark text-decoration-none p-2">
          <i className="bi-instagram"></i>
        </Link>

        <ul className="nav nav-pills flex-column align-items-center align-items-sm-start w-100" id="menu">
          {SIDEBAR_LINKS.map((item, index) => (
            <SidebarItem key={index} url={item.url} iconName={item.icon} text={item.text} targetModal={item.target}/>
          ))}
        </ul>

        <div className="dropdown px-2 py-1 transparent-background-hover rounded rounded-2">
          <Link href="#" className="d-flex align-items-center text-dark text-decoration-none fs-5" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <i className=" bi-list"></i> <span className="ms-3 d-none d-xl-inline">More</span>
          </Link>
          <ul className="dropdown-menu text-small shadow">
            <li><Link className="dropdown-item" href="#">Settings</Link></li>
            <li><Link className="dropdown-item" href="#">Profile</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link onClick={handleLogout} className="dropdown-item" href="#">Sign out</Link></li>
          </ul>
        </div>
      </div>

      {/* Page content */}
      <div className="flex-grow-1 overflow-y-auto bg-light">
        {children}
      </div>

      {/* Modals */}
      <SearchOffset />
      <NotificationsOffset />
    </div>
  );
};
