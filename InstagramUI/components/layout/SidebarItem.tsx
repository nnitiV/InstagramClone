import Link from "next/link";

type SidebarItemProps = {
    url: string;
    iconName: string;
    text: string;
    targetModal: string;
}

export default function SidebarItem({ url, iconName, text, targetModal }: SidebarItemProps) {
    return (
        <Link href={url}
            className="nav-item text-decoration-none transparent-background-hover d-flex 
        align-items-center my-1 px-2 rounded rounded-2 cursor-pointer fs-5"
            style={{ width: "fit-content" }}
            data-bs-toggle={targetModal.length > 0 && "offcanvas"}
            data-bs-target={`#${targetModal}`} aria-controls={targetModal}>
            <li className="nav-link align-middle px-0 text-dark">
                <i className={`bi-${iconName}`}></i>
                <span className="ms-3 d-none d-xl-inline">{text}</span>
            </li>
        </Link>)
}
