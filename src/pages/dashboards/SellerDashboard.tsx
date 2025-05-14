import { NavBar } from "@/components/NavBar";
import { Card } from "@/components/ui/card";
import { Store, BarChart, Package, CreditCard, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useRef } from 'react';

const SellerDashboard = () => {
  const dashboardCards = [
    {
      title: "Products",
      description: "Manage your product listings",
      icon: <Store className="h-10 w-10 text-green-500" />,
      link: "/dashboard/seller/products"
    },
    {
      title: "Sales Analytics",
      description: "View your sales performance",
      icon: <BarChart className="h-10 w-10 text-green-500" />,
      link: "/dashboard/seller/analytics"
    },
    {
      title: "Payments",
      description: "View and manage your payments",
      icon: <CreditCard className="h-10 w-10 text-green-500" />,
      link: "/dashboard/seller/payments"
    },
    {
      title: "Messages",
      description: "Chat with middlemen and buyers",
      icon: <MessageCircle className="h-10 w-10 text-green-500" />,
      link: "/dashboard/seller/chat"
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active': return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'sold': return <Badge className="bg-blue-100 text-blue-800">Sold</Badge>;
      default: return <Badge>Unknown</Badge>;
    }
  };

  function getRandomOrder() {
    const orderNumbers = [
      'ORDER-12350', 'ORDER-12351', 'ORDER-12352', 'ORDER-12353', 'ORDER-12354',
      'ORDER-12355', 'ORDER-12356', 'ORDER-12357', 'ORDER-12358', 'ORDER-12359',
    ];
    const customers = [
      'Alice Lee', 'Brian Kim', 'Cathy Chen', 'David Park', 'Ella Cruz',
      'Frank Yu', 'Grace Lim', 'Henry Tan', 'Ivy Ong', 'Jackie Wu',
    ];
    const statuses = ['active', 'sold'];
    const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const randomDate = () => {
      const start = new Date(2023, 0, 1);
      const end = new Date(2023, 11, 31);
      const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return d.toLocaleDateString();
    };
    return {
      id: Math.random().toString(36).substr(2, 9),
      orderNumber: random(orderNumbers),
      customerName: random(customers),
      date: randomDate(),
      status: random(statuses),
      total: (Math.random() * 500 + 20).toFixed(2),
    };
  }

  const INITIAL_ORDERS = [
    {
      id: '1', orderNumber: 'ORDER-12348', customerName: 'Emma Wilson', date: '9/5/2023', status: 'sold', total: '49.99'
    },
    {
      id: '2', orderNumber: 'ORDER-12349', customerName: 'Robert Davis', date: '11/15/2023', status: 'active', total: '129.99'
    },
    {
      id: '3', orderNumber: 'ORDER-12345', customerName: 'John Smith', date: '10/15/2023', status: 'active', total: '149.99'
    },
    {
      id: '4', orderNumber: 'ORDER-12346', customerName: 'Sarah Johnson', date: '11/2/2023', status: 'sold', total: '79.99'
    },
    {
      id: '5', orderNumber: 'ORDER-12347', customerName: 'Michael Brown', date: '11/20/2023', status: 'active', total: '299.99'
    },
  ];

  const STATUS_STYLES = {
    sold: 'bg-blue-100 text-blue-700',
    active: 'bg-green-100 text-green-700',
  };

  function ModernRecentOrdersTable() {
    const [orders, setOrders] = useState(() => {
      const more = Array.from({ length: 15 }, getRandomOrder);
      return [...INITIAL_ORDERS, ...more];
    });
    const visibleRows = 7;
    // Duplicate the orders for seamless looping
    const displayOrders = [...orders, ...orders.slice(0, visibleRows)];
    const rowHeight = 48; // px, adjust if needed for your row height
    const totalRows = displayOrders.length;
    const scrollHeight = rowHeight * totalRows;
    const animationDuration = totalRows * 0.7; // seconds, adjust for speed

    return (
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-hidden" style={{ height: rowHeight * visibleRows }}>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-sm text-gray-500">
                <th className="text-left py-2 px-3">Order #</th>
                <th className="text-left py-2 px-3">Customer</th>
                <th className="text-left py-2 px-3">Date</th>
                <th className="text-left py-2 px-3">Status</th>
                <th className="text-left py-2 px-3">Total</th>
              </tr>
            </thead>
            <tbody
              style={{
                display: 'block',
                height: scrollHeight,
                animation: `scrollList ${animationDuration}s linear infinite`,
              }}
            >
              {displayOrders.map((order, idx) => (
                <tr
                  key={order.id + idx}
                  className="border-b hover:bg-green-50 transition-colors duration-200"
                  style={{
                    display: 'table',
                    width: '100%',
                    tableLayout: 'fixed',
                    height: rowHeight,
                  }}
                >
                  <td className="py-2 px-3 font-medium">{order.orderNumber}</td>
                  <td className="py-2 px-3">{order.customerName}</td>
                  <td className="py-2 px-3 text-gray-600">{order.date}</td>
                  <td className="py-2 px-3">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[order.status]}`}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                  </td>
                  <td className="py-2 px-3 font-semibold">₱{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <style>{`
          @keyframes scrollList {
            0% { transform: translateY(0); }
            100% { transform: translateY(-${rowHeight * (orders.length)}px); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="page-container">
      <NavBar userType="seller" />
      <main className="flex-1 bg-green-50">
        <div className="container mx-auto px-4 py-8">
          {/* <h1 className="text-3xl font-bold mb-8">Seller Dashboard</h1> */}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {dashboardCards.map((card, index) => (
              <Link to={card.link} key={index}>
                <Card className="dashboard-card hover:border-green-300 transition-all hover:shadow-md cursor-pointer">
                  <div className="flex flex-col items-center text-center gap-4 p-6">
                    {card.icon}
                    <h2 className="text-xl font-semibold">{card.title}</h2>
                    <p className="text-gray-600 text-sm">{card.description}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          {/* Recent Orders Section */}
          <ModernRecentOrdersTable />
        </div>
      </main>
      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} <span className="text-black">Sell</span><span className="text-blue-600">Mate</span>. All rights reserved.
      </footer>
    </div>
  );
};

export default SellerDashboard;
