import React, { useState } from 'react';
import { NavBar } from "@/components/NavBar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, ArrowLeft, Check, Plus, Trash2, Edit, AlertCircle, Info, CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { motion } from 'framer-motion';

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface PaymentAccount {
  id: string;
  methodId: string;
  accountName: string;
  accountNumber: string;
  isDefault: boolean;
}

const PaymentMethodsPage = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<PaymentAccount[]>([
    { id: '1', methodId: 'gcash', accountName: 'Personal GCash', accountNumber: '09123456789', isDefault: true },
    { id: '2', methodId: 'maya', accountName: 'Maya Account', accountNumber: '09876543210', isDefault: false },
  ]);
  const [newAccount, setNewAccount] = useState({
    accountName: '',
    accountNumber: '',
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [guideStep, setGuideStep] = useState(0);
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [accountDetails, setAccountDetails] = useState<PaymentAccount | null>(null);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'gcash',
      name: 'GCash',
      icon: '/GCash-Logo.png',
      description: 'Connect your GCash account for secure transactions with middlemen'
    },
    {
      id: 'maya',
      name: 'Paymaya',
      icon: '/PayMaya-Logo_Vertical.png',
      description: 'Use Paymaya for fast and reliable payments with middlemen'
    },
    {
      id: 'credit-card',
      name: 'GOtyme',
      icon: '/OIP-removebg-preview.png',
      description: 'Add your GOtyme card for convenient transactions'
    }
  ];

  const guideSteps = [
    {
      title: "Welcome to Payment Setup!",
      description: "Easily configure your payment methods to transact with middlemen. Let's get started!",
      illustration: (
        <CreditCard className="w-20 h-20 text-blue-500 mx-auto" />
      )
    },
    {
      title: "Select a Payment Method",
      description: "Choose from GCash, Paymaya, or GOtyme by clicking on the card.",
      illustration: (
        <CreditCard className="w-20 h-20 text-blue-500 mx-auto" />
      )
    },
    {
      title: "Add Account Details",
      description: "Click 'Add Account', then enter your account name and number for the selected method.",
      illustration: (
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Add Account" className="w-24 h-24 object-contain mx-auto" />
      )
    },
    {
      title: "Set as Default (Optional)",
      description: "Mark your preferred account as default for faster transactions.",
      illustration: (
        <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="Set Default" className="w-24 h-24 object-contain mx-auto" />
      )
    },
    {
      title: "Save and Confirm",
      description: "Click 'Save' to add your payment method. You can manage or remove accounts anytime.",
      illustration: (
        <img src="https://cdn-icons-png.flaticon.com/512/753/753345.png" alt="Save" className="w-24 h-24 object-contain mx-auto" />
      )
    },
    {
      title: "Ready to Transact!",
      description: "Use your saved payment methods to pay or receive funds from middlemen securely.",
      illustration: (
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto animate-bounce" />
      )
    }
  ];

  const handleGoBack = () => {
    navigate('/dashboard/buyer');
  };

  const handleSelectMethod = (methodId: string) => {
    setSelectedMethod(methodId);
  };

  const handleAddAccount = () => {
    if (!selectedMethod || !newAccount.accountName || !newAccount.accountNumber) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newAccountObj: PaymentAccount = {
      id: Date.now().toString(),
      methodId: selectedMethod,
      accountName: newAccount.accountName,
      accountNumber: newAccount.accountNumber,
      isDefault: accounts.length === 0 || accounts.filter(a => a.methodId === selectedMethod).length === 0,
    };

    setAccounts([...accounts, newAccountObj]);
    setNewAccount({ accountName: '', accountNumber: '' });
    setDialogOpen(false);
    
    toast({
      title: "Account added",
      description: `Your ${paymentMethods.find(m => m.id === selectedMethod)?.name} account has been successfully added.`,
      variant: "default",
    });
  };

  const handleSetDefault = (accountId: string) => {
    const updatedAccounts = accounts.map(account => ({
      ...account,
      isDefault: account.id === accountId,
    }));
    setAccounts(updatedAccounts);
    
    toast({
      title: "Default account updated",
      description: "Your default payment account has been updated successfully.",
      variant: "default",
    });
  };

  const handleDeleteAccount = (accountId: string) => {
    const updatedAccounts = accounts.filter(account => account.id !== accountId);
    setAccounts(updatedAccounts);
    
    toast({
      title: "Account removed",
      description: "The payment account has been removed successfully.",
      variant: "default",
    });
  };

  const filteredAccounts = selectedMethod ? accounts.filter(account => account.methodId === selectedMethod) : accounts;

  return (
    <div className="page-container">
      <NavBar userType="buyer" />
      <main className="flex-1 bg-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={handleGoBack} className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
            </Button>
            <h1 className="text-3xl font-bold">Payment Methods</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-blue-100">Sellmate</p>
                    <h3 className="text-2xl font-bold mt-1">Payment Setup</h3>
                    <p className="text-sm text-blue-100 mt-2">
                      Configure your payment methods to easily transact with middlemen
                    </p>
                    <div className="mt-4">
                      <Button variant="secondary" size="sm" className="bg-white text-blue-600 hover:bg-blue-50" onClick={() => setShowGuide(true)}>
                        Learn More
                      </Button>
                    </div>
                  </div>
                  <div className="bg-blue-400 bg-opacity-30 p-3 rounded-full">
                    <CreditCard className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8 border-2 border-blue-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
              <CardTitle>Select Your Preferred Payment Method</CardTitle>
              <CardDescription>
                Choose from our available payment options to transact with middlemen
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 justify-items-center">
                {paymentMethods.map((method) => (
                  <Card 
                    key={method.id}
                    className={`w-full max-w-xs cursor-pointer transition-all hover:shadow-lg transform hover:-translate-y-1 
                    ${selectedMethod === method.id ? 'border-blue-500 ring-2 ring-blue-300 shadow-md' : 'hover:border-blue-300'}`}
                    onClick={() => handleSelectMethod(method.id)}
                  >
                    <div className="p-8 flex flex-col items-center text-center gap-4">
                      <div className="relative">
                        <img src={method.icon} alt={method.name + ' logo'} className="h-20 w-36 object-contain mx-auto" />
                        {selectedMethod === method.id && (
                          <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1">
                            <Check className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                      <h2 className="text-2xl font-semibold">{method.name}</h2>
                      <p className="text-gray-600 text-base">{method.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {selectedMethod && (
            <Card className="border-2 border-blue-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
                <CardTitle>Manage Your {paymentMethods.find(m => m.id === selectedMethod)?.name} Accounts</CardTitle>
                <CardDescription>
                  Add, remove, or set your default account for transactions with middlemen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Your Accounts</h3>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          Add New Account
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New {paymentMethods.find(m => m.id === selectedMethod)?.name} Account</DialogTitle>
                          <DialogDescription>
                            Enter your account details below to add a new payment option.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="account-name">Account Name</Label>
                            <Input
                              id="account-name"
                              placeholder="Enter account name (e.g., Personal GCash)"
                              value={newAccount.accountName}
                              onChange={(e) => setNewAccount({...newAccount, accountName: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="account-number">Account Number</Label>
                            <Input
                              id="account-number"
                              placeholder="Enter account number"
                              value={newAccount.accountNumber}
                              onChange={(e) => setNewAccount({...newAccount, accountNumber: e.target.value})}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                          <Button onClick={handleAddAccount}>Add Account</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {filteredAccounts.length > 0 ? (
                    <div className="space-y-4">
                      {filteredAccounts.map((account) => {
                        const method = paymentMethods.find(m => m.id === account.methodId);
                        return (
                          <Card key={account.id} className={`border ${account.isDefault ? 'border-blue-500 bg-blue-50' : ''}`}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                  <div className="bg-blue-100 p-2 rounded-full">
                                    <img src={method?.icon} alt={method?.name + ' logo'} className="h-5 w-5 object-contain" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium">{account.accountName}</h4>
                                    <p className="text-sm text-gray-600">{account.accountNumber}</p>
                                  </div>
                                  {account.isDefault && (
                                    <span className="bg-blue-100 text-blue-600 text-xs py-1 px-2 rounded-full">
                                      Default
                                    </span>
                                  )}
                                </div>
                                <div className="flex gap-2">
                                  {!account.isDefault && (
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleSetDefault(account.id)}
                                    >
                                      Set as Default
                                    </Button>
                                  )}
                                  <Button 
                                    variant="destructive" 
                                    size="sm"
                                    className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border-red-200"
                                    onClick={() => handleDeleteAccount(account.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="text-blue-600 border-blue-300 hover:bg-blue-50"
                                    onClick={() => { setAccountDetails(account); setShowAccountDetails(true); }}
                                  >
                                    View Details
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-10 border rounded-md bg-gray-50">
                      <AlertCircle className="h-10 w-10 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No accounts added yet</h3>
                      <p className="text-gray-500 mb-4">Add your first {paymentMethods.find(m => m.id === selectedMethod)?.name} account to get started</p>
                      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                          <Button>Add an Account</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New {paymentMethods.find(m => m.id === selectedMethod)?.name} Account</DialogTitle>
                            <DialogDescription>
                              Enter your account details below to add a new payment option.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="account-name">Account Name</Label>
                              <Input
                                id="account-name"
                                placeholder="Enter account name (e.g., Personal GCash)"
                                value={newAccount.accountName}
                                onChange={(e) => setNewAccount({...newAccount, accountName: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="account-number">Account Number</Label>
                              <Input
                                id="account-number"
                                placeholder="Enter account number"
                                value={newAccount.accountNumber}
                                onChange={(e) => setNewAccount({...newAccount, accountNumber: e.target.value})}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                            <Button onClick={handleAddAccount}>Add Account</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="bg-blue-50 border-t border-blue-100 flex justify-between">
                <p className="text-sm text-blue-700">
                  <AlertCircle className="h-4 w-4 inline mr-1" />
                  Your payment information is securely stored
                </p>
                <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Sellmate. All rights reserved.
      </footer>
      <Dialog open={showGuide} onOpenChange={(open) => { setShowGuide(open); if (!open) setGuideStep(0); }}>
        <DialogContent className="max-w-lg p-8 rounded-2xl shadow-2xl flex flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {guideSteps.map((_, idx) => (
              <span key={idx} className={`w-3 h-3 rounded-full transition-all duration-300 ${guideStep === idx ? 'bg-blue-600 scale-125' : 'bg-blue-200'}`}></span>
            ))}
          </div>
          {/* Illustration */}
          <div className="mb-4">{guideSteps[guideStep].illustration}</div>
          {/* Title */}
          <h2 className="text-2xl font-bold text-blue-800 mb-2 text-center">{guideSteps[guideStep].title}</h2>
          {/* Description */}
          <p className="text-blue-700 text-center mb-6">{guideSteps[guideStep].description}</p>
          {/* Stepper Controls */}
          <div className="flex w-full justify-between mt-2">
            <Button variant="ghost" className="text-blue-600" onClick={() => setGuideStep(s => Math.max(0, s - 1))} disabled={guideStep === 0}>
              <ArrowLeft className="w-5 h-5 mr-1" /> Back
            </Button>
            {guideStep < guideSteps.length - 1 ? (
              <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold shadow text-base py-2 rounded-lg" onClick={() => setGuideStep(s => Math.min(guideSteps.length - 1, s + 1))}>
                Next <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            ) : (
              <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold shadow text-base py-2 rounded-lg" onClick={() => { setShowGuide(false); setGuideStep(0); }}>
                Finish
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
      {/* Account Details Modal */}
      <Dialog open={showAccountDetails} onOpenChange={setShowAccountDetails}>
        <DialogContent className="max-w-md p-8 rounded-2xl shadow-2xl flex flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100">
          {accountDetails && (
            <>
              <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg">
                <img src={paymentMethods.find(m => m.id === accountDetails.methodId)?.icon} alt="method" className="w-10 h-10 object-contain" />
              </div>
              <h2 className="text-2xl font-bold text-blue-800 mb-2">Account Details</h2>
              <div className="w-full text-left space-y-2 mb-4">
                <div><span className="font-semibold text-blue-700">Account Name:</span> {accountDetails.accountName}</div>
                <div><span className="font-semibold text-blue-700">Account Number:</span> {accountDetails.accountNumber}</div>
                <div><span className="font-semibold text-blue-700">Payment Method:</span> {paymentMethods.find(m => m.id === accountDetails.methodId)?.name}</div>
                {accountDetails.isDefault && <div className="text-green-600 font-semibold">Default Account</div>}
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold shadow text-base py-2 rounded-lg mt-2" onClick={() => setShowAccountDetails(false)}>
                Close
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentMethodsPage;
