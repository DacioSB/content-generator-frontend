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
                <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center">
                        <FileText className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-lg font-semibold">ContentGen</span>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                <nav className="mt-5 flex-1 space-y-1 px-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                                    isActive(item.path)
                                        ? "text-teal-600 bg-teal-50"
                                        : "text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                <Icon className="mr-3 h-5 w-5" />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                         <img 
                            src={user?.imageUrl} 
                            alt="User profile" 
                            className="h-8 w-8 rounded-full bg-gray-200" 
                        />
                        <span className="ml-3 text-sm font-medium text-gray-700">
                             {user?.fullName || "User"}
                        </span>
                    </div>
                    <LogOut 
                        className="h-5 w-5 text-gray-400 hover:text-gray-500 cursor-pointer" 
                        onClick={() => signOut()}
                    />
                </div>
            </div>
        </div>
    );
}
