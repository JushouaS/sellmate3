import React from 'react';
import { NavBar } from "@/components/NavBar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCheck, ArrowLeft, Eye, Shield, AlertTriangle, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

interface Transaction {
  id: string;
  transactionId: string;
  date: string;
  buyer: string;
  seller: string;
  status: 'pending' | 'in-review' | 'completed' | 'disputed';
  amount: number;
  productName: string;
}

const TransactionsPage = () => {
  const navigate = useNavigate();
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [selectedTransaction, setSelectedTransaction] = React.useState<Transaction | null>(null);
  const [editStatus, setEditStatus] = React.useState<Transaction['status']>('pending');
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [transactionToDelete, setTransactionToDelete] = React.useState<Transaction | null>(null);
  const [transactions, setTransactions] = React.useState<Transaction[]>([
    {
      id: '1',
      transactionId: 'MM-12345',
      date: '2023-11-15',
      buyer: 'John Smith',
      seller: 'Tech Shop Inc.',
      status: 'pending',
      amount: 1249.99,
      productName: 'Gaming Laptop'
    },
    {
      id: '2',
      transactionId: 'MM-12346',
      date: '2023-11-12',
      buyer: 'Sarah Johnson',
      seller: 'Home Goods Store',
      status: 'in-review',
      amount: 379.99,
      productName: 'Kitchen Appliance Set'
    },
    {
      id: '3',
      transactionId: 'MM-12347',
      date: '2023-11-10',
      buyer: 'Michael Brown',
      seller: 'Sports Outlet',
      status: 'completed',
      amount: 199.99,
      productName: 'Mountain Bike'
    },
    {
      id: '4',
      transactionId: 'MM-12348',
      date: '2023-11-05',
      buyer: 'Emma Wilson',
      seller: 'Fashion Boutique',
      status: 'pending',
      amount: 89.99,
      productName: 'Designer Bag'
    }
  ]);

  const handleGoBack = () => {
    navigate('/dashboard/middleman');
  };

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'pending': return <Badge className="bg-blue-100 text-blue-800">Pending</Badge>;
      case 'in-review': return <Badge className="bg-yellow-100 text-yellow-800">In Review</Badge>;
      case 'completed': return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      default: return <Badge>Unknown</Badge>;
    }
  };

  const handleEditClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setEditStatus(transaction.status);
    setEditDialogOpen(true);
  };

  const handleEditSave = () => {
    if (!selectedTransaction) return;
    setTransactions(prev => prev.map(t => t.id === selectedTransaction.id ? { ...t, status: editStatus } : t));
    setEditDialogOpen(false);
  };

  const handleDeleteClick = (transaction: Transaction) => {
    setTransactionToDelete(transaction);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!transactionToDelete) return;
    setTransactions(prev => prev.filter(t => t.id !== transactionToDelete.id));
    setDeleteDialogOpen(false);
  };

  return (
    <div className="page-container">
      <NavBar userType="middleman" />
      <main className="flex-1 bg-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={handleGoBack} className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
            </Button>
            <h1 className="text-3xl font-bold">Active Transactions</h1>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Manage Ongoing Transactions</CardTitle>
              <CardDescription>
                Review and manage transactions between buyers and sellers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All Transactions</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="in-review">In Review</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="disputed">Disputed</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-0">
                  <TransactionsList 
                    transactions={transactions} 
                    getStatusBadge={getStatusBadge}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                  />
                </TabsContent>

                <TabsContent value="pending" className="mt-0">
                  <TransactionsList 
                    transactions={transactions.filter(transaction => transaction.status === 'pending')} 
                    getStatusBadge={getStatusBadge}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                  />
                </TabsContent>

                <TabsContent value="in-review" className="mt-0">
                  <TransactionsList 
                    transactions={transactions.filter(transaction => transaction.status === 'in-review')} 
                    getStatusBadge={getStatusBadge}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                  />
                </TabsContent>

                <TabsContent value="completed" className="mt-0">
                  <TransactionsList 
                    transactions={transactions.filter(transaction => transaction.status === 'completed')} 
                    getStatusBadge={getStatusBadge}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                  />
                </TabsContent>

                <TabsContent value="disputed" className="mt-0">
                  <TransactionsList 
                    transactions={transactions.filter(transaction => transaction.status === 'disputed')} 
                    getStatusBadge={getStatusBadge}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
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
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Transaction Status</DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div><strong>Transaction ID:</strong> {selectedTransaction.transactionId}</div>
              <div><strong>Buyer:</strong> {selectedTransaction.buyer}</div>
              <div><strong>Seller:</strong> {selectedTransaction.seller}</div>
              <div><strong>Product:</strong> {selectedTransaction.productName}</div>
              <div>
                <label className="block mb-2 font-semibold">Status</label>
                <Select value={editStatus} onValueChange={v => setEditStatus(v as Transaction['status'])}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-review">In Review</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full mt-4" onClick={handleEditSave}>Save</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Transaction</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Are you sure you want to delete this transaction?</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleDeleteConfirm}>Delete</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface TransactionsListProps {
  transactions: Transaction[];
  getStatusBadge: (status: Transaction['status']) => React.ReactNode;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

const TransactionsList = ({ transactions, getStatusBadge, onEdit, onDelete }: TransactionsListProps) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-8">
        <UserCheck className="h-12 w-12 mx-auto text-gray-400 mb-4" />
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
            <th className="text-left py-3 px-4">Buyer</th>
            <th className="text-left py-3 px-4">Seller</th>
            <th className="text-left py-3 px-4">Product</th>
            <th className="text-left py-3 px-4">Amount</th>
            <th className="text-left py-3 px-4">Status</th>
            <th className="text-right py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">{transaction.transactionId}</td>
              <td className="py-3 px-4 text-gray-600">{new Date(transaction.date).toLocaleDateString()}</td>
              <td className="py-3 px-4">{transaction.buyer}</td>
              <td className="py-3 px-4">{transaction.seller}</td>
              <td className="py-3 px-4 max-w-[150px] truncate" title={transaction.productName}>
                {transaction.productName}
              </td>
              <td className="py-3 px-4">₱{transaction.amount.toFixed(2)}</td>
              <td className="py-3 px-4">{getStatusBadge(transaction.status)}</td>
              <td className="py-3 px-4 text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => onEdit(transaction)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700" onClick={() => onDelete(transaction)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsPage;
