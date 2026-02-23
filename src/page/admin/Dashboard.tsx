import { BookOpen, Users, DollarSign, TrendingUp } from "lucide-react";

const Dashboard = () => {
    const stats = [
        { label: "Total Books", value: "1,240", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-100" },
        { label: "Active Users", value: "45,210", icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
        { label: "Total Revenue", value: "$12,450", icon: DollarSign, color: "text-green-600", bg: "bg-green-100" },
        { label: "Sales Growth", value: "+24%", icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-100" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
                <p className="text-muted-foreground">Monitor your bookstore's performance and manage your content.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                    <Icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Activity placeholder */}
            <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border flex items-center justify-between">
                    <h3 className="font-bold">Recent Orders</h3>
                    <button className="text-primary text-sm font-medium hover:underline">View All</button>
                </div>
                <div className="p-6">
                    <div className="text-center py-10 text-muted-foreground">
                        <p>No recent orders to display.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
