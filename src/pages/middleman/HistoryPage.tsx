
import React from 'react';
import { NavBar } from "@/components/NavBar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, ArrowLeft, Download, Filter, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

interface Transaction {
  id: string;
  transactionId: string;
  date: string;
  parties: string;
  result: 'approved' | 'rejected' | 'cancelled';
  amount: number;
  type: string;
  resolution: string;
}

const HistoryPage = () => {
  const navigate = useNavigate();

  const transactions: Transaction[] = [
    {
      id: '1',
      transactionId: 'MM-12305',
      date: '2023-10-15',
      parties: 'John Smith & Tech Shop Inc.',
      result: 'approved',
      amount: 69999.44, // Converted from 1249.99 USD to PHP
      type: 'Product Purchase',
      resolution: 'Transaction completed successfully'
    },
    {
      id: '2',
      transactionId: 'MM-12306',
      date: '2023-10-22',
      parties: 'Sarah Johnson & Home Goods Store',
      result: 'rejected',
      amount: 21279.44, // Converted from 379.99 USD to PHP
      type: 'Product Purchase',
      resolution: 'Product was not as described'
    },
    {
      id: '3',
      transactionId: 'MM-12307',
      date: '2023-10-30',
      parties: 'Michael Brown & Sports Outlet',
      result: 'approved',
      amount: 11199.44, // Converted from 199.99 USD to PHP
      type: 'Product Purchase',
      resolution: 'Transaction completed successfully'
    },
    {
      id: '4',
      transactionId: 'MM-12308',
      date: '2023-11-05',
      parties: 'Emma Wilson & Fashion Boutique',
      result: 'approved',
      amount: 5039.44, // Converted from 89.99 USD to PHP
      type: 'Product Purchase',
      resolution: 'Transaction completed successfully'
    },
    {
      id: '5',
      transactionId: 'MM-12309',
      date: '2023-11-10',
      parties: 'Robert Davis & Electronics Store',
      result: 'cancelled',
      amount: 33599.44, // Converted from 599.99 USD to PHP
      type: 'Product Purchase',
      resolution: 'Buyer cancelled before delivery'
    }
  ];

  const handleGoBack = () => {
    navigate('/dashboard/middleman');
  };

  // Data for transaction history chart
  const chartData = [
    { name: 'Jun', approved: 15, rejected: 2, cancelled: 1 },
    { name: 'Jul', approved: 18, rejected: 3, cancelled: 2 },
    { name: 'Aug', approved: 22, rejected: 4, cancelled: 3 },
    { name: 'Sep', approved: 25, rejected: 3, cancelled: 2 },
    { name: 'Oct', approved: 28, rejected: 5, cancelled: 4 },
    { name: 'Nov', approved: 21, rejected: 3, cancelled: 2 },
  ];

  const getResultBadge = (result: Transaction['result']) => {
    switch (result) {
      case 'approved': 
        return (
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-4 w-4 mr-1" />
            <span>Approved</span>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex items-center text-red-600">
            <XCircle className="h-4 w-4 mr-1" />
            <span>Rejected</span>
          </div>
        );
      case 'cancelled':
        return (
          <div className="flex items-center text-gray-600">
            <XCircle className="h-4 w-4 mr-1" />
            <span>Cancelled</span>
          </div>
        );
      default:
        return <span>Unknown</span>;
    }
  };

  return (
    <div className="page-container">
      <NavBar userType="middleman" />
      <main className="flex-1 bg-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={handleGoBack} className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">Transaction History</h1>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Monthly Transaction Summary</CardTitle>
              <CardDescription>
                Overview of transaction outcomes over the past 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="approved" fill="#10b981" name="Approved" />
                    <Bar dataKey="rejected" fill="#ef4444" name="Rejected" />
                    <Bar dataKey="cancelled" fill="#9ca3af" name="Cancelled" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Past Transactions</CardTitle>
                  <CardDescription>
                    Complete record of transactions you've mediated
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b text-sm text-gray-500">
                      <th className="text-left py-3 px-4">Transaction ID</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Parties</th>
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Amount</th>
                      <th className="text-left py-3 px-4">Result</th>
                      <th className="text-left py-3 px-4">Resolution</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{transaction.transactionId}</td>
                        <td className="py-3 px-4 text-gray-600">{new Date(transaction.date).toLocaleDateString()}</td>
                        <td className="py-3 px-4">{transaction.parties}</td>
                        <td className="py-3 px-4">{transaction.type}</td>
                        <td className="py-3 px-4">₱{transaction.amount.toFixed(2)}</td>
                        <td className="py-3 px-4">{getResultBadge(transaction.result)}</td>
                        <td className="py-3 px-4 max-w-[200px] truncate" title={transaction.resolution}>
                          {transaction.resolution}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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

export default HistoryPage;
