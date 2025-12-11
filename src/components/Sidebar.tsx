import { FileText, Settings, Folder, LayoutDashboard, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";

export function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { signOut } = useClerk();
    const { user } = useUser();

    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/my-content', label: 'My Content', icon: FileText },
        { path: '/projects', label: 'Projects', icon: Folder },
        { path: '/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="hidden w-64 flex-shrink-0 bg-white border-r md:flex md:flex-col">
            {/* Header */}
            <div className="flex h-16 items-center justify-between border-b px-4">

            </div>
        </div>
    );
}