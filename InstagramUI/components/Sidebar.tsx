import Link from "next/link";
import { ReactNode } from "react";

const Sidebar = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 shadow-sm me-3" style={{ maxWidth: "200px" }}>
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100">
            <Link href="/" className="d-flex align-items-center pb-3 mb-5 me-md-auto text-decoration-none">
              <i className="fs-2 bi-instagram"></i>
            </Link>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start mt-5" id="menu">
              <li className="nav-item">
                <Link href="#" className="nav-link align-middle px-0">
                  <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="#" className="nav-link align-middle px-0">
                  <i className="fs-4 bi-camera-reels"></i> <span className="ms-1 d-none d-sm-inline">Reels</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="#" className="nav-link align-middle px-0">
                  <i className="fs-4 bi-chat-right"></i> <span className="ms-1 d-none d-sm-inline">Messages</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-search"></i> <span className="ms-1 d-none d-sm-inline">Search</span></Link>
              </li>
              <li>
                <Link href="#" className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-compass"></i> <span className="ms-1 d-none d-sm-inline">Explore</span></Link>
              </li>
              <li>
                <Link href="#" className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-heart"></i> <span className="ms-1 d-none d-sm-inline">Notifications</span></Link>
              </li>
              <li>
                <Link href="#" className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-plus-square"></i> <span className="ms-1 d-none d-sm-inline">Create</span></Link>
              </li>
              <li>
                <Link href="#" className="nav-link px-0 align-middle">
                  <i className="fs-4 bi-person-circle"></i> <span className="ms-1 d-none d-sm-inline">Profile</span></Link>
              </li>
            </ul>
            <hr />
            <div className="dropdown pb-4">
              <Link href="#" className="d-flex align-items-center text-decoration-none" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fs-1 bi-list"></i> <span className="ms-1 fs-5 d-none d-sm-inline">More</span>
              </Link>
              <ul className="dropdown-menu text-small shadow">
                <li><Link className="dropdown-item" href="#">New project...</Link></li>
                <li><Link className="dropdown-item" href="#">Settings</Link></li>
                <li><Link className="dropdown-item" href="#">Profile</Link></li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li><Link className="dropdown-item" href="/login">Sign out</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col py-3">
          {children}
        </div>
      </div>
    </div >

  )
};

export default Sidebar;
