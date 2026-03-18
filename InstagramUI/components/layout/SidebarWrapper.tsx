"use client";
import Sidebar from "@/components/layout/Sidebar";
import { usePathname } from "next/navigation";

type SidebarProps = {
    children: React.ReactNode;
    picture: string;
}
export default function SidebarWrapper({ children, picture }: SidebarProps) {
    const path = usePathname();

    const hiddenRoutes = ['/login', '/register', '/stories']

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
