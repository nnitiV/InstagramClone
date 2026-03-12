import Link from "next/link";

type SidebarItemProps = {
    url: string;
    iconName: string;
    text: string;
    targetModal: string;
    isModal: boolean;
    isDropdown: boolean | undefined;
    dropdownOptions? : string[] | undefined;
    dropdownTargets?: string[] | undefined;
}

export default function SidebarItem({ url, iconName, text, targetModal, isModal, isDropdown, 
    dropdownOptions, dropdownTargets }: SidebarItemProps) {
    if(isDropdown) return (
        <div className="dropdown px-2 py-1 transparent-background-hover rounded rounded-2 w-100">
          <Link href="#" className="d-flex align-items-center text-dark text-decoration-none fs-5" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <i className={`bi-${iconName}`}></i> <span className="ms-3 d-none d-xl-inline">{text}</span>
          </Link>
          <ul className="dropdown-menu text-small shadow">
            {dropdownOptions?.map((option, index) => (
                <li key={index}><Link className="dropdown-item" href="#" 
                data-bs-toggle="modal"
                data-bs-target={`#${dropdownTargets && dropdownTargets[index]}`}>{option}</Link></li>
            ))}
          </ul>
        </div>
    )
    return (
        <Link href={url}
            className="nav-item text-decoration-none transparent-background-hover d-flex 
        align-items-center my-1 px-2 rounded rounded-2 cursor-pointer fs-5 w-100"
            style={{ width: "fit-content" }}
            data-bs-toggle={targetModal.length > 0 ? (isModal ? "modal" : "offcanvas") : ""}
            data-bs-target={`#${targetModal.length > 0 ? targetModal : ""}`} aria-controls={targetModal}
        >
            <li className="nav-link align-middle px-0 text-dark">
                <i className={`bi-${iconName}`}></i>
                <span className="ms-3 d-none d-xl-inline">{text}</span>
            </li>
        </Link>)
}
