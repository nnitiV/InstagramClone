import { handleLogout } from "@/feature/auth/services/auth-service";
import Link from "next/link";
import { ReactNode } from "react";
import SearchOffset from "./SearchOffset";

export default function Sidebar({ children, picture }: { children: ReactNode, picture: string }) {

  return (
    <div className="d-flex vh-100 overflow-hidden">
      <div
        className="d-flex flex-column flex-shrink-0 bg-white shadow-sm px-2"
        style={{ width: "auto" }}
      >

          <Link href="/" className="d-flex align-items-center pb-3 mb-4 me-md-auto text-dark text-decoration-none p-2">
            <i className="fs-4 bi-instagram"></i>
          </Link>

          <ul className="nav nav-pills flex-column mb-auto align-items-center align-items-sm-start w-100"id="menu">
            <li className="nav-item w-100 transparent-background-hover d-flex align-items-center px-2 rounded rounded-2 mb-2 cursor-pointer">
              <Link href="/" className="nav-link align-middle px-0 text-dark">
                <i className="fs-5 bi-house"></i> <span className="ms-3 d-none d-sm-inline">Home</span>
              </Link>
            </li>
            <li className="nav-item w-100 transparent-background-hover d-flex align-items-center px-2 rounded rounded-2 mb-2 cursor-pointer">
              <Link href="/reels" className="nav-link align-middle px-0 text-dark">
                <i className="fs-5 bi-camera-reels"></i> <span className="ms-3 d-none d-sm-inline">Reels</span>
              </Link>
            </li>
            <li className="nav-item w-100 transparent-background-hover d-flex align-items-center px-2 rounded rounded-2 mb-2 cursor-pointer">
              <Link href="/messages" className="nav-link align-middle px-0 text-dark">
                <i className="fs-5 bi-chat-right"></i> <span className="ms-3 d-none d-sm-inline">Messages</span>
              </Link>
            </li>
            <li className="nav-item w-100 transparent-background-hover d-flex align-items-center px-2 rounded rounded-2 mb-2 cursor-pointer" data-bs-toggle="offcanvas" data-bs-target="#searchOffcanvas" aria-controls="searchOffcanvas">
              <Link href="#" className="nav-link align-middle px-0 text-dark">
                <i className="fs-5 bi-search"></i> <span className="ms-3 d-none d-sm-inline">Search</span>
              </Link>
            </li>
            <li className="nav-item w-100 transparent-background-hover d-flex align-items-center px-2 rounded rounded-2 mb-2 cursor-pointer">
              <Link href="/explore" className="nav-link align-middle px-0 text-dark">
                <i className="fs-5 bi-compass"></i> <span className="ms-3 d-none d-sm-inline">Explore</span>
              </Link>
            </li>

            <li className="nav-item w-100 transparent-background-hover d-flex align-items-center px-2 rounded rounded-2 mb-2 cursor-pointer">
              <Link href="/notifications" className="nav-link align-middle px-0 text-dark">
                <i className="fs-5 bi-heart"></i> <span className="ms-3 d-none d-sm-inline">Notifications</span>
              </Link>
            </li>
            <li className="nav-item w-100 transparent-background-hover d-flex align-items-center px-2 rounded rounded-2 mb-2 cursor-pointer ">
              <Link href="#" className="nav-link align-middle px-0 text-dark">
                <i className="fs-5 bi-plus-square"></i> <span className="ms-3 d-none d-sm-inline">Create</span>
              </Link>
            </li>
            <li className="nav-item w-100 transparent-background-hover d-flex align-items-center px-2 rounded rounded-2 mb-2 cursor-pointer ">
              <Link href="/profile" className="nav-link align-middle px-0 text-dark">
                <img src={picture.length > 0 ? picture : "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"} style={{ marginRight: "-12px", width: "30px", height: "30px" }} /> <span className="ms-3 d-none d-sm-inline">Profile</span>
              </Link>
            </li>
          </ul>

          <div className="dropdown p-2 mt-4 transparent-background-hover rounded rounded-2">
            <Link href="#" className="d-flex align-items-center text-dark text-decoration-none" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="fs-2 bi-list"></i> <span className="ms-3 fs-5 d-none d-sm-inline">More</span>
            </Link>
            <ul className="dropdown-menu text-small shadow">
              <li><Link className="dropdown-item" href="#">New project...</Link></li>
              <li><Link className="dropdown-item" href="#">Settings</Link></li>
              <li><Link className="dropdown-item" href="#">Profile</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li><Link onClick={handleLogout} className="dropdown-item" href="#">Sign out</Link></li>
            </ul>
          </div>

      </div>

      <div className="flex-grow-1 overflow-y-auto bg-light">
        {children}
      </div>
      <SearchOffset />
    </div>
  );
};
