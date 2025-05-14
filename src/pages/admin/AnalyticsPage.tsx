import React, { useState } from 'react';
import { NavBar } from "@/components/NavBar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart as BarChartIcon, ArrowLeft, Download, Calendar, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const AnalyticsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState<'30days' | '90days' | '1year'>('30days');

  const handleGoBack = () => {
    navigate('/dashboard/admin');
  };

  const handleExportReport = () => {
    // In a real application, this would trigger a report generation
    // For now, we'll just show a toast notification
    toast({
      title: "Report Export Started",
      description: "Your report is being generated and will be available for download shortly.",
    });
  };

  const handleTimeRangeChange = (range: '30days' | '90days' | '1year') => {
    setTimeRange(range);
    toast({
      title: "Time Range Updated",
      description: `Data now showing for the last ${range === '30days' ? '30 days' : range === '90days' ? '90 days' : 'year'}.`,
    });
  };

  // Data for platform overview
  const platformOverview = {
    totalTransactions: 12568,
    totalRevenue: 398450.75,
    transactionGrowth: 15.8,
    revenueGrowth: 12.3,
    averageTransactionValue: 189.25,
    conversionRate: 3.2
  };

  // Data for charts
  const monthlyTransactionsData = [
    { name: 'Jan', value: 845 },
    { name: 'Feb', value: 912 },
    { name: 'Mar', value: 875 },
    { name: 'Apr', value: 920 },
    { name: 'May', value: 980 },
    { name: 'Jun', value: 1020 },
    { name: 'Jul', value: 1150 },
    { name: 'Aug', value: 1250 },
    { name: 'Sep', value: 1380 },
    { name: 'Oct', value: 1420 },
    { name: 'Nov', value: 1500 },
    { name: 'Dec', value: 1650 },
  ];

  const revenueData = [
    { name: 'Jan', value: 25890 },
    { name: 'Feb', value: 28450 },
    { name: 'Mar', value: 27500 },
    { name: 'Apr', value: 29600 },
    { name: 'May', value: 31200 },
    { name: 'Jun', value: 32500 },
    { name: 'Jul', value: 36800 },
    { name: 'Aug', value: 38900 },
    { name: 'Sep', value: 42300 },
    { name: 'Oct', value: 45600 },
    { name: 'Nov', value: 47500 },
    { name: 'Dec', value: 52800 },
  ];

  const userActivityData = [
    { name: 'Jan', buyers: 2500, sellers: 850, middlemen: 120 },
    { name: 'Feb', buyers: 2650, sellers: 900, middlemen: 130 },
    { name: 'Mar', buyers: 2800, sellers: 920, middlemen: 140 },
    { name: 'Apr', buyers: 2750, sellers: 950, middlemen: 145 },
    { name: 'May', buyers: 2900, sellers: 980, middlemen: 150 },
    { name: 'Jun', buyers: 3100, sellers: 1020, middlemen: 160 },
    { name: 'Jul', buyers: 3300, sellers: 1100, middlemen: 170 },
    { name: 'Aug', buyers: 3450, sellers: 1150, middlemen: 175 },
    { name: 'Sep', buyers: 3600, sellers: 1200, middlemen: 180 },
    { name: 'Oct', buyers: 3750, sellers: 1250, middlemen: 190 },
    { name: 'Nov', buyers: 3900, sellers: 1300, middlemen: 200 },
    { name: 'Dec', buyers: 4100, sellers: 1350, middlemen: 210 },
  ];

  const transactionCategoryData = [
    { name: 'Electronics', value: 35 },
    { name: 'Clothing', value: 25 },
    { name: 'Home & Living', value: 20 },
    { name: 'Sports', value: 10 },
    { name: 'Others', value: 10 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#a855f7', '#eab308', '#ef4444'];

  return (
    <div className="page-container">
      <NavBar userType="admin" />
      <main className="flex-1 bg-red-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Button variant="ghost" onClick={handleGoBack} className="mr-2">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-3xl font-bold">System Analytics</h1>
            </div>
            <div className="flex gap-2 items-center">
              <div className="hidden md:flex items-center">
                <Button 
                  variant={timeRange === "30days" ? "default" : "outline"} 
                  className="rounded-r-none"
                  onClick={() => handleTimeRangeChange("30days")}
                >
                  30 Days
                </Button>
                <Button 
                  variant={timeRange === "90days" ? "default" : "outline"} 
                  className="rounded-none border-x-0"
                  onClick={() => handleTimeRangeChange("90days")}
                >
                  90 Days
                </Button>
                <Button 
                  variant={timeRange === "1year" ? "default" : "outline"} 
                  className="rounded-l-none"
                  onClick={() => handleTimeRangeChange("1year")}
                >
                  1 Year
                </Button>
              </div>
              <Button onClick={handleExportReport}>
                <Download className="h-4 w-4 mr-2" />
                Export Reports
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Transactions</p>
                    <h3 className="text-2xl font-bold mt-1">{platformOverview.totalTransactions.toLocaleString()}</h3>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-sm font-medium text-green-600">
                        +{platformOverview.transactionGrowth}%
                      </span>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-full">
                    <BarChartIcon className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                    <h3 className="text-2xl font-bold mt-1">₱{platformOverview.totalRevenue.toLocaleString()}</h3>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-sm font-medium text-green-600">
                        +{platformOverview.revenueGrowth}%
                      </span>
                    </div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-3xl font-bold">₱</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Average Transaction</p>
                    <h3 className="text-2xl font-bold mt-1">₱{platformOverview.averageTransactionValue}</h3>
                    <div className="flex items-center mt-1">
                      <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                      <span className="text-sm font-medium text-red-600">
                        -2.1%
                      </span>
                    </div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-full">
                    <Calendar className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="transactions" className="w-full mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="users">User Activity</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
            </TabsList>

            <Card>
              <CardHeader>
                <TabsContent value="transactions" className="mt-0">
                  <CardTitle>Monthly Transactions</CardTitle>
                  <CardDescription>
                    Number of transactions processed per month
                  </CardDescription>
                </TabsContent>
                <TabsContent value="revenue" className="mt-0">
                  <CardTitle>Monthly Revenue</CardTitle>
                  <CardDescription>
                    Total revenue generated per month
                  </CardDescription>
                </TabsContent>
                <TabsContent value="users" className="mt-0">
                  <CardTitle>User Activity</CardTitle>
                  <CardDescription>
                    Monthly active users by role
                  </CardDescription>
                </TabsContent>
                <TabsContent value="categories" className="mt-0">
                  <CardTitle>Transaction Categories</CardTitle>
                  <CardDescription>
                    Distribution of transactions by product category
                  </CardDescription>
                </TabsContent>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <TabsContent value="transactions" className="mt-0 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={monthlyTransactionsData}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </TabsContent>

                  <TabsContent value="revenue" className="mt-0 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={revenueData}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`₱${value}`, 'Revenue']} />
                        <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>

                  <TabsContent value="users" className="mt-0 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={userActivityData}
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
                        <Bar dataKey="buyers" name="Buyers" stackId="a" fill="#3b82f6" />
                        <Bar dataKey="sellers" name="Sellers" stackId="a" fill="#10b981" />
                        <Bar dataKey="middlemen" name="Middlemen" stackId="a" fill="#a855f7" />
                      </BarChart>
                    </ResponsiveContainer>
                  </TabsContent>

                  <TabsContent value="categories" className="mt-0 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={transactionCategoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {transactionCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </div>
              </CardContent>
            </Card>
          </Tabs>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Metrics (Last {timeRange === '30days' ? '30 Days' : timeRange === '90days' ? '90 Days' : 'Year'})</CardTitle>
                <CardDescription>
                  Important performance indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Transaction Success Rate</span>
                    <span className="text-sm font-bold">98.2%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '98.2%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Dispute Rate</span>
                    <span className="text-sm font-bold">1.8%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '1.8%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">User Retention</span>
                    <span className="text-sm font-bold">85.4%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '85.4%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Platform Utilization</span>
                    <span className="text-sm font-bold">76.9%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '76.9%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
                <CardDescription>
                  Technical performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Server Uptime</span>
                    <span className="text-sm font-bold">99.98%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '99.98%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Average Response Time</span>
                    <span className="text-sm font-bold">125ms</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Error Rate</span>
                    <span className="text-sm font-bold">0.12%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '0.12%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">CPU Utilization</span>
                    <span className="text-sm font-bold">42.5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '42.5%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} MultiPortal. All rights reserved.
      </footer>
    </div>
  );
};

export default AnalyticsPage;
