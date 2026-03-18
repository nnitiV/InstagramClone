import { BASE_URL } from "@/constants";
import Link from "next/link";

type SidebarItemProps = {
    url: string;
    iconName: string;
    text: string;
    targetModal: string;
    isModal: boolean;
    isDropdown?: boolean;
    dropdownOptions?: string[];
    dropdownTargets?: string[];
    picture?: string;
}

export default function SidebarItem({ url, iconName, text, targetModal, isModal, isDropdown, dropdownOptions, dropdownTargets,
    picture }: SidebarItemProps) {
    if (isDropdown) return (
        <li className="nav-link align-middle p-0 my-2 d-flex align-items-center transparent-background-hover w-100" role="button">
            <Link href="#" className=" d-flex align-items-center text-body text-decoration-none fs-5" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <i className={`bi-${iconName}`}></i> <span className="ms-3 d-none d-xl-inline">{text}</span>
            </Link>
            <ul className="dropdown-menu text-small shadow">
                {dropdownOptions?.map((option, index) => (
                    <li key={index}>
                        <Link className="dropdown-item" href="#" data-bs-toggle="modal"
                            data-bs-target={`#${dropdownTargets && dropdownTargets[index]}`}>
                            {option}
                        </Link>
                    </li>
                ))}
            </ul>
        </li>
    )
    return (
        <li className="nav-link align-middle p-0 my-2 d-flex align-items-center transparent-background-hover w-100" role="button">
            <Link href={url}
                className={`nav-item text-body text-decoration-none h-100 w-100 rounded rounded-2 cursor-pointer fs-5`}
                data-bs-toggle={targetModal.length > 0 ? (isModal ? "modal" : "offcanvas") : ""}
                data-bs-target={`#${targetModal.length > 0 ? targetModal : ""}`} aria-controls={targetModal}
            >
                {picture ?
                    <img className="rounded-circle m-0 p-0" style={{ width: "30px", height: "30px" }} src={BASE_URL + picture} alt="" />
                    :
                    <i className={`bi-${iconName}`}></i>
                }
                <span className={`${picture ? "ms-2" : "ms-3"} d-none d-xl-inline`}>{text}</span>
            </Link>
        </li>
    )
}
