import { handleLogout } from "@/services/auth.service";
import Link from "next/link";
import { ReactNode } from "react";
import SearchOffcanvas from "./SearchOffcanvas";
import SidebarItem from "./SidebarItem";
import NotificationsOffcanvas from "./NotificationsOffcanvas";
import CreatePostModal from "./CreatePostModal";
import CreateStoryModal from "./CreateStoryModal";
import InstagramLogo from "../ui/InstagramLogo";
import SidebarMoreDropdown from "./SidebarMoreDropdown";

type SidebarProps = { children: ReactNode; picture: string };

const SIDEBAR_LINKS = [
  { url: "/", icon: "house", text: "Home", target: "", isModal: false },
  // { url: "/reels", icon: "camera-reels", text: "Reels",target: "", isModal: false  },
  {
    url: "/messages",
    icon: "chat-right",
    text: "Messages",
    target: "",
    isModal: false,
  },
  {
    url: "#",
    icon: "search",
    text: "Search",
    target: "searchOffcanvas",
    isModal: false,
  },
  {
    url: "/explore",
    icon: "compass",
    text: "Explore",
    target: "",
    isModal: false,
  },
  {
    url: "#",
    icon: "heart",
    text: "Notifications",
    target: "notificationsOffset",
    isModal: false,
  },
  {
    url: "#",
    icon: "plus-square",
    text: "Create",
    target: "createModal",
    isModal: true,
    isDropdown: true,
    dropdownOptions: ["Post", "Story"],
    dropdownTargets: ["createModal", "createStory"],
  },
  {
    url: "/profile",
    icon: "person-circle",
    text: "Profile",
    target: "",
    isModal: false,
  },
];

export default function Sidebar({ children, picture }: SidebarProps) {
  return (
    <div
      className="d-flex overflow-hidden"
      style={{ height: "100dvh", width: "100vw" }}
    >
      <div
        className="d-flex flex-column justify-content-between flex-shrink-0 shadow-sm px-2 py-3 border-end"
        style={{ width: "fit-content" }}
      >
        <Link
          href="/"
          className="transparent-background-hover d-flex align-items-center me-md-auto text-body 
        text-decoration-none p-2 fs-5"
        >
          <InstagramLogo isIcon={true} />
        </Link>

        <ul
          className="nav nav-pills flex-column align-items-center align-items-sm-start w-100"
          id="menu"
        >
          {SIDEBAR_LINKS.map((item) => (
            <SidebarItem
              key={item.text}
              url={item.url}
              iconName={item.icon}
              text={item.text}
              targetModal={item.target}
              isModal={item.isModal}
              isDropdown={item.isDropdown}
              dropdownOptions={item.dropdownOptions}
              dropdownTargets={item.dropdownTargets}
              picture={item.text === "Profile" ? picture : undefined}
            />
          ))}
        </ul>

        <SidebarMoreDropdown handleLogout={handleLogout} />
      </div>

      {/* Page content */}
      <div className="flex-grow-1 overflow-y-auto">{children}</div>

      {/* Modals */}
      <CreatePostModal />
      <CreateStoryModal />
      <SearchOffcanvas />
      <NotificationsOffcanvas />
    </div>
  );
}
