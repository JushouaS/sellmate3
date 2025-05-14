import React from 'react';
import { NavBar } from "@/components/NavBar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ArrowLeft, CheckCircle, Truck, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  customerName: string;
  items: number;
}

const OrdersPage = () => {
  const navigate = useNavigate();

  const orders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORDER-12345',
      date: '2023-10-15',
      status: 'new',
      total: 149.99,
      customerName: 'John Smith',
      items: 2
    },
    {
      id: '2',
      orderNumber: 'ORDER-12346',
      date: '2023-11-02',
      status: 'processing',
      total: 79.99,
      customerName: 'Sarah Johnson',
      items: 1
    },
    {
      id: '3',
      orderNumber: 'ORDER-12347',
      date: '2023-11-20',
      status: 'shipped',
      total: 299.99,
      customerName: 'Michael Brown',
      items: 3
    },
    {
      id: '4',
      orderNumber: 'ORDER-12348',
      date: '2023-09-05',
      status: 'delivered',
      total: 49.99,
      customerName: 'Emma Wilson',
      items: 1
    },
    {
      id: '5',
      orderNumber: 'ORDER-12349',
      date: '2023-11-15',
      status: 'cancelled',
      total: 129.99,
      customerName: 'Robert Davis',
      items: 2
    }
  ];

  const handleGoBack = () => {
    navigate('/dashboard/seller');
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'new': return <Badge className="bg-blue-100 text-blue-800">New</Badge>;
      case 'processing': return <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>;
      case 'shipped': return <Badge className="bg-purple-100 text-purple-800">Shipped</Badge>;
      case 'delivered': return <Badge className="bg-green-100 text-green-800">Delivered</Badge>;
      case 'cancelled': return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default: return <Badge>Unknown</Badge>;
    }
  };

  const getActionButtons = (status: Order['status']) => {
    switch (status) {
      case 'new':
        return (
          <Button variant="outline" size="sm" className="text-yellow-600">
            Process Order
          </Button>
        );
      case 'processing':
        return (
          <Button variant="outline" size="sm" className="text-purple-600">
            <Truck className="h-4 w-4 mr-2" />
            Ship Order
          </Button>
        );
      case 'shipped':
        return (
          <Button variant="outline" size="sm" className="text-green-600">
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark Delivered
          </Button>
        );
      case 'delivered':
        return null;
      case 'cancelled':
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="page-container">
      <NavBar userType="seller" />
      <main className="flex-1 bg-green-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={handleGoBack} className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
            </Button>
            <h1 className="text-3xl font-bold">Manage Orders</h1>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Customer Orders</CardTitle>
              <CardDescription>
                Process and fulfill orders from your customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All Orders</TabsTrigger>
                  <TabsTrigger value="new">New</TabsTrigger>
                  <TabsTrigger value="processing">Processing</TabsTrigger>
                  <TabsTrigger value="shipped">Shipped</TabsTrigger>
                  <TabsTrigger value="delivered">Delivered</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-0">
                  <OrdersList 
                    orders={orders} 
                    getStatusBadge={getStatusBadge}
                    getActionButtons={getActionButtons}
                  />
                </TabsContent>

                <TabsContent value="new" className="mt-0">
                  <OrdersList 
                    orders={orders.filter(order => order.status === 'new')} 
                    getStatusBadge={getStatusBadge}
                    getActionButtons={getActionButtons}
                  />
                </TabsContent>

                <TabsContent value="processing" className="mt-0">
                  <OrdersList 
                    orders={orders.filter(order => order.status === 'processing')} 
                    getStatusBadge={getStatusBadge}
                    getActionButtons={getActionButtons}
                  />
                </TabsContent>

                <TabsContent value="shipped" className="mt-0">
                  <OrdersList 
                    orders={orders.filter(order => order.status === 'shipped')} 
                    getStatusBadge={getStatusBadge}
                    getActionButtons={getActionButtons}
                  />
                </TabsContent>

                <TabsContent value="delivered" className="mt-0">
                  <OrdersList 
                    orders={orders.filter(order => order.status === 'delivered')} 
                    getStatusBadge={getStatusBadge}
                    getActionButtons={getActionButtons}
                  />
                </TabsContent>

                <TabsContent value="cancelled" className="mt-0">
                  <OrdersList 
                    orders={orders.filter(order => order.status === 'cancelled')} 
                    getStatusBadge={getStatusBadge}
                    getActionButtons={getActionButtons}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} MultiPortal. All rights reserved.
      </footer>
    </div>
  );
};

interface OrdersListProps {
  orders: Order[];
  getStatusBadge: (status: Order['status']) => React.ReactNode;
  getActionButtons: (status: Order['status']) => React.ReactNode;
}

const OrdersList = ({ orders, getStatusBadge, getActionButtons }: OrdersListProps) => {
  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500">No orders found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-sm text-gray-500">
            <th className="text-left py-3 px-4">Order #</th>
            <th className="text-left py-3 px-4">Date</th>
            <th className="text-left py-3 px-4">Customer</th>
            <th className="text-left py-3 px-4">Status</th>
            <th className="text-left py-3 px-4">Items</th>
            <th className="text-left py-3 px-4">Total</th>
            <th className="text-right py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">{order.orderNumber}</td>
              <td className="py-3 px-4 text-gray-600">{new Date(order.date).toLocaleDateString()}</td>
              <td className="py-3 px-4">{order.customerName}</td>
              <td className="py-3 px-4">{getStatusBadge(order.status)}</td>
              <td className="py-3 px-4">{order.items}</td>
              <td className="py-3 px-4">₱{order.total.toFixed(2)}</td>
              <td className="py-3 px-4 text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  {getActionButtons(order.status)}
                  {(order.status === 'new' || order.status === 'processing') && (
                    <Button variant="outline" size="sm" className="text-red-600">
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
