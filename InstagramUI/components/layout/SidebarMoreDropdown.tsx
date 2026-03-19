"use client";
import { useThemeStore } from "@/stores/useThemeStore";
import Link from "next/link";

type SidebarMoreDropdownProps = {
  handleLogout: () => Promise<never>;
};

export default function SidebarMoreDropdown({
  handleLogout,
}: SidebarMoreDropdownProps) {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  return (
    <div className="dropdown transparent-background-hover rounded rounded-2">
      <a
        role="button"
        className="d-flex align-items-center text-body text-decoration-none fs-5"
        id="dropdownUser1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className=" bi-list"></i>{" "}
        <span className="ms-3 d-none d-xl-inline">More</span>
      </a>
      <ul className="dropdown-menu text-small shadow">
        {/* <li><Link className="dropdown-item" href="#">Settings</Link></li> */}
        <li className="dropdown-item" role="button" onClick={toggleTheme}>
          {theme == "light" ? "Dark" : "Light"}
        </li>
        <li>
          <Link className="dropdown-item" href="/profile">
            Profile
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button onClick={handleLogout} className="dropdown-item">
            Sign out
          </button>
        </li>
      </ul>
    </div>
  );
}
