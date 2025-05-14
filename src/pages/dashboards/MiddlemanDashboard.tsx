import { NavBar } from "@/components/NavBar";
import { Card } from "@/components/ui/card";
import { UserCheck, BarChart, Calendar, Users, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const MiddlemanDashboard = () => {
  const dashboardCards = [
    {
      title: "Active Transactions",
      description: "Manage ongoing transactions",
      icon: <UserCheck className="h-10 w-10 text-purple-500" />,
      link: "/dashboard/middleman/transactions"
    },
    {
      title: "Transaction History",
      description: "View past transaction records",
      icon: <BarChart className="h-10 w-10 text-purple-500" />,
      link: "/dashboard/middleman/history"
    },
    {
      title: "Clients",
      description: "View and manage your client list",
      icon: <Users className="h-10 w-10 text-purple-500" />,
      link: "/dashboard/middleman/clients"
    },
    {
      title: "Messages",
      description: "Chat with buyers and sellers",
      icon: <MessageCircle className="h-10 w-10 text-purple-500" />,
      link: "/dashboard/middleman/chat"
    },
  ];

  return (
    <div className="page-container">
      <NavBar userType="middleman" />
      <main className="flex-1 bg-purple-50">
        <div className="container mx-auto px-4 py-8">
          {/* <h1 className="text-3xl font-bold mb-8">Middleman Dashboard</h1> */}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {dashboardCards.map((card, index) => (
              <Link to={card.link} key={index} className="h-full">
                <Card className="dashboard-card hover:border-purple-300 transition-all hover:shadow-md cursor-pointer h-full flex flex-col justify-between">
                  <div className="flex flex-col items-center text-center gap-4 p-6 flex-1">
                    {card.icon}
                    <h2 className="text-xl font-semibold">{card.title}</h2>
                    <p className="text-gray-600 text-sm">{card.description}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
          <Card className="p-6">
            <p className="text-gray-500 text-center py-8">No recent transactions</p>
          </Card>
        </div>
      </main>
      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} <span className="text-black">Sell</span><span className="text-blue-600">Mate</span>. All rights reserved.
      </footer>
    </div>
  );
};

export default MiddlemanDashboard;
