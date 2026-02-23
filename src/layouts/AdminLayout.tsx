import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BookCopy, Users, Settings, LogOut } from "lucide-react";

const AdminLayout = () => {
    const location = useLocation();

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
        { icon: BookCopy, label: "Books", path: "/admin/books" },
        { icon: Users, label: "Users", path: "/admin/users" },
        { icon: Settings, label: "Settings", path: "/admin/settings" },
    ];

    return (
        <div className="flex min-h-screen bg-secondary/30">
            {/* Sidebar */}
            <aside className="w-64 bg-card border-r border-border flex flex-col">
                <div className="p-6 border-b border-border">
                    <h2 className="text-xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Admin Panel
                    </h2>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                    }`}
                            >
                                <Icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-border">
                    <button className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-card border-b border-border flex items-center justify-between px-8">
                    <h3 className="font-semibold text-foreground">
                        {menuItems.find(item => item.path === location.pathname)?.label || "Admin"}
                    </h3>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm font-medium">Super Admin</p>
                            <p className="text-xs text-muted-foreground">admin@bookstore.com</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-primary/20 border border-primary/20 flex items-center justify-center font-bold text-primary">
                            SA
                        </div>
                    </div>
                </header>
                <div className="flex-1 overflow-auto p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
