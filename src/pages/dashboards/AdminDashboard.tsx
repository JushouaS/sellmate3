import { NavBar } from "@/components/NavBar";
import { Card } from "@/components/ui/card";
import { Shield, Users, BarChart, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const dashboardCards = [
    {
      title: "System Overview",
      description: "Monitor system health and status",
      icon: <Shield className="h-10 w-10 text-red-500" />,
      link: "/dashboard/admin/overview"
    },
    {
      title: "User Management",
      description: "Manage all users and their permissions",
      icon: <Users className="h-10 w-10 text-red-500" />,
      link: "/dashboard/admin/users"
    },
    {
      title: "Analytics",
      description: "View system analytics and reports",
      icon: <BarChart className="h-10 w-10 text-red-500" />,
      link: "/dashboard/admin/analytics"
    },
    {
      title: "System Settings",
      description: "Configure and customize the system",
      icon: <Settings className="h-10 w-10 text-red-500" />,
      link: "/dashboard/admin/settings"
    },
  ];

  return (
    <div className="page-container">
      <NavBar userType="admin" />
      <main className="flex-1 bg-red-50">
        <div className="container mx-auto px-4 py-8">
          {/* <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1> */}
          {/* <h1 className="text-3xl font-bold mb-2"><span className="text-black">Sell</span><span className="text-blue-600">Mate</span> Admin Dashboard</h1> */}
          {/* <p className="text-gray-600 mb-8">Manage your middleman platform efficiently</p> */}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {dashboardCards.map((card, index) => (
              <Link to={card.link} key={index} className="h-full">
                <Card className="dashboard-card hover:border-red-300 transition-all hover:shadow-md cursor-pointer transform hover:-translate-y-1 h-full flex flex-col justify-between">
                  <div className="flex flex-col items-center text-center gap-4 p-6 flex-1">
                    <div className="bg-red-100 p-3 rounded-full">
                      {card.icon}
                    </div>
                    <h2 className="text-xl font-semibold">{card.title}</h2>
                    <p className="text-gray-600 text-sm">{card.description}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 border-2 border-red-100">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Shield className="h-5 w-5 text-red-500 mr-2" />
                Recent Activity
              </h2>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                  <p className="text-sm"><span className="font-medium">Admin</span> updated system settings <span className="text-gray-500 text-xs">2 hours ago</span></p>
                </div>
                <div className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                  <p className="text-sm"><span className="font-medium">System</span> completed database backup <span className="text-gray-500 text-xs">6 hours ago</span></p>
                </div>
                <div className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                  <p className="text-sm"><span className="font-medium">Admin</span> approved new middleman <span className="text-gray-500 text-xs">1 day ago</span></p>
                </div>
              </div>
            </Card>
            <Card className="p-6 border-2 border-red-100">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <BarChart className="h-5 w-5 text-red-500 mr-2" />
                System Status
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Server Status</span>
                  <span className="bg-green-100 text-green-700 text-xs py-1 px-2 rounded-full">Operational</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Database Status</span>
                  <span className="bg-green-100 text-green-700 text-xs py-1 px-2 rounded-full">Operational</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">API Status</span>
                  <span className="bg-green-100 text-green-700 text-xs py-1 px-2 rounded-full">Operational</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Payment System</span>
                  <span className="bg-green-100 text-green-700 text-xs py-1 px-2 rounded-full">Operational</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} <span className="text-black">Sell</span><span className="text-blue-600">Mate</span>. All rights reserved.
      </footer>
    </div>
  );
};

export default AdminDashboard;
