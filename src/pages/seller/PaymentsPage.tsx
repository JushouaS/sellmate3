import React from 'react';
import { NavBar } from "@/components/NavBar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, ArrowLeft, Download, Filter, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Payment {
  id: string;
  transactionId: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  type: 'sale' | 'refund' | 'payout';
  customer: string;
}

const PaymentsPage = () => {
  const navigate = useNavigate();

  const payments: Payment[] = [
    {
      id: '1',
      transactionId: 'TXN-78901',
      date: '2023-11-15',
      amount: 8399.44, // PHP amount
      status: 'completed',
      type: 'sale',
      customer: 'John Smith'
    },
    {
      id: '2',
      transactionId: 'TXN-78902',
      date: '2023-11-12',
      amount: 4479.44, // PHP amount
      status: 'completed',
      type: 'sale',
      customer: 'Sarah Johnson'
    },
    {
      id: '3',
      transactionId: 'TXN-78903',
      date: '2023-11-10',
      amount: 1679.44, // PHP amount
      status: 'failed',
      type: 'sale',
      customer: 'Michael Brown'
    },
    {
      id: '4',
      transactionId: 'TXN-78904',
      date: '2023-11-08',
      amount: 2799.44, // PHP amount
      status: 'pending',
      type: 'refund',
      customer: 'Emma Wilson'
    },
    {
      id: '5',
      transactionId: 'TXN-78905',
      date: '2023-11-01',
      amount: 28000.00, // PHP amount
      status: 'completed',
      type: 'payout',
      customer: 'System'
    }
  ];

  const handleGoBack = () => {
    navigate('/dashboard/seller');
  };

  const handleRequestPayout = () => {
    toast.success("Payout request submitted. It will be processed within 2-3 business days.");
  };

  const handleExport = () => {
    toast.success("Transaction data exported successfully. Check your downloads folder.");
  };

  const handleFilter = () => {
    toast.info("Filter options will be available soon.");
  };

  const handleViewTransaction = () => {
    toast.info("Transaction details view will be available soon.");
  };

  const getStatusBadge = (status: Payment['status']) => {
    switch (status) {
      case 'completed': return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'pending': return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'failed': return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default: return <Badge>Unknown</Badge>;
    }
  };

  const getTypeIcon = (type: Payment['type']) => {
    switch (type) {
      case 'sale': return <ArrowUpRight className="h-4 w-4 text-green-600" />;
      case 'refund': return <ArrowDownRight className="h-4 w-4 text-red-600" />;
      case 'payout': return <ArrowDownRight className="h-4 w-4 text-blue-600" />;
      default: return null;
    }
  };

  const getTypeText = (type: Payment['type']) => {
    switch (type) {
      case 'sale': return <span className="text-green-600">Sale</span>;
      case 'refund': return <span className="text-red-600">Refund</span>;
      case 'payout': return <span className="text-blue-600">Payout</span>;
      default: return <span>Unknown</span>;
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
            <h1 className="text-3xl font-bold">Payments</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Weekly Sales</p>
                    <h3 className="text-2xl font-bold mt-1">₱25,321.54</h3>
                    <p className="text-sm text-gray-500 mt-1">Last 7 days</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-full">
                    <CreditCard className="h-8 w-8 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Monthly Sales</p>
                    <h3 className="text-2xl font-bold mt-1">₱98,765.43</h3>
                    <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-full">
                    <ArrowUpRight className="h-8 w-8 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Annual Sales</p>
                    <h3 className="text-2xl font-bold mt-1">₱1,234,567.89</h3>
                    <p className="text-sm text-gray-500 mt-1">Last 12 months</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-full">
                    <ArrowDownRight className="h-8 w-8 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>
                    View and manage your payment transactions
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleFilter}>
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleExport}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All Transactions</TabsTrigger>
                  <TabsTrigger value="sales">Sales</TabsTrigger>
                  <TabsTrigger value="refunds">Refunds</TabsTrigger>
                  <TabsTrigger value="payouts">Payouts</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-0">
                  <PaymentsList 
                    payments={payments} 
                    getStatusBadge={getStatusBadge}
                    getTypeIcon={getTypeIcon}
                    getTypeText={getTypeText}
                    onViewTransaction={handleViewTransaction}
                  />
                </TabsContent>

                <TabsContent value="sales" className="mt-0">
                  <PaymentsList 
                    payments={payments.filter(payment => payment.type === 'sale')}
                    getStatusBadge={getStatusBadge}
                    getTypeIcon={getTypeIcon}
                    getTypeText={getTypeText}
                    onViewTransaction={handleViewTransaction}
                  />
                </TabsContent>

                <TabsContent value="refunds" className="mt-0">
                  <PaymentsList 
                    payments={payments.filter(payment => payment.type === 'refund')}
                    getStatusBadge={getStatusBadge}
                    getTypeIcon={getTypeIcon}
                    getTypeText={getTypeText}
                    onViewTransaction={handleViewTransaction}
                  />
                </TabsContent>

                <TabsContent value="payouts" className="mt-0">
                  <PaymentsList 
                    payments={payments.filter(payment => payment.type === 'payout')}
                    getStatusBadge={getStatusBadge}
                    getTypeIcon={getTypeIcon}
                    getTypeText={getTypeText}
                    onViewTransaction={handleViewTransaction}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Sellmate. All rights reserved.
      </footer>
    </div>
  );
};

interface PaymentsListProps {
  payments: Payment[];
  getStatusBadge: (status: Payment['status']) => React.ReactNode;
  getTypeIcon: (type: Payment['type']) => React.ReactNode;
  getTypeText: (type: Payment['type']) => React.ReactNode;
  onViewTransaction: () => void;
}

const PaymentsList = ({ payments, getStatusBadge, getTypeIcon, getTypeText, onViewTransaction }: PaymentsListProps) => {
  if (payments.length === 0) {
    return (
      <div className="text-center py-8">
        <CreditCard className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500">No transactions found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-sm text-gray-500">
            <th className="text-left py-3 px-4">Transaction ID</th>
            <th className="text-left py-3 px-4">Date</th>
            <th className="text-left py-3 px-4">Type</th>
            <th className="text-left py-3 px-4">Customer</th>
            <th className="text-left py-3 px-4">Amount</th>
            <th className="text-left py-3 px-4">Status</th>
            <th className="text-right py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">{payment.transactionId}</td>
              <td className="py-3 px-4 text-gray-600">{new Date(payment.date).toLocaleDateString()}</td>
              <td className="py-3 px-4">
                <div className="flex items-center">
                  {getTypeIcon(payment.type)}
                  <span className="ml-1">{getTypeText(payment.type)}</span>
                </div>
              </td>
              <td className="py-3 px-4">{payment.customer}</td>
              <td className="py-3 px-4 font-medium">
                ₱{payment.amount.toFixed(2)}
              </td>
              <td className="py-3 px-4">{getStatusBadge(payment.status)}</td>
              <td className="py-3 px-4 text-right">
                <Button variant="outline" size="sm" onClick={onViewTransaction}>
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsPage;
