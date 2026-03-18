"use client";
import Sidebar from "@/components/layout/Sidebar";
import { usePathname } from "next/navigation";

type SidebarProps = {
    children: React.ReactNode;
    picture: string;
}

const hiddenRoutes = ['/login', '/register', '/stories']

export default function SidebarWrapper({ children, picture }: SidebarProps) {
    const path = usePathname();

    const hideSidebar = hiddenRoutes.some(route => path.startsWith(route));

    if (hideSidebar) {
        return (
            <>{children}</>
        )
    }
    return (
        <Sidebar picture={picture}>{children}</Sidebar>
    )
}
