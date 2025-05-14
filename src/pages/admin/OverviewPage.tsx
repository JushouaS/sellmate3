import React, { useState } from 'react';
import { NavBar } from "@/components/NavBar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  ArrowLeft, 
  Users, 
  ShoppingBag, 
  UserCheck, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Info
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type AlertStatus = 'normal' | 'warning' | 'critical';

interface SystemAlert {
  id: string;
  title: string;
  status: AlertStatus;
  message: string;
  details?: string;
  timestamp?: string;
  affectedSystems?: string[];
}

const OverviewPage = () => {
  const navigate = useNavigate();
  const [selectedAlert, setSelectedAlert] = useState<SystemAlert | null>(null);

  const handleGoBack = () => {
    navigate('/dashboard/admin');
  };

  // Data for the dashboard widgets
  const systemStats = {
    totalUsers: 1254,
    activeUsers: 876,
    totalProducts: 3678,
    pendingApprovals: 23
  };

  // Data for registration chart
  const registrationData = [
    { name: 'Jun', buyers: 45, sellers: 15, middlemen: 5 },
    { name: 'Jul', buyers: 52, sellers: 18, middlemen: 3 },
    { name: 'Aug', buyers: 58, sellers: 21, middlemen: 4 },
    { name: 'Sep', buyers: 65, sellers: 25, middlemen: 6 },
    { name: 'Oct', buyers: 72, sellers: 28, middlemen: 5 },
    { name: 'Nov', buyers: 80, sellers: 32, middlemen: 7 },
  ];

  // Data for user distribution
  const userDistributionData = [
    { name: 'Buyers', value: 65 },
    { name: 'Sellers', value: 25 },
    { name: 'Middlemen', value: 8 },
    { name: 'Admins', value: 2 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#a855f7', '#ef4444'];

  // Data for system alerts with properly typed status and additional details
  const systemAlerts: SystemAlert[] = [
    {
      id: '1',
      title: 'Server Performance',
      status: 'normal',
      message: 'All systems operating normally',
      details: 'All server metrics are within normal operating parameters. CPU usage is at 35%, memory usage at 42%, and network bandwidth is optimal. Last maintenance performed on April 15, 2025.',
      timestamp: '2025-04-17T07:30:00Z',
      affectedSystems: ['Web Servers', 'Database Servers']
    },
    {
      id: '2',
      title: 'Database Backup',
      status: 'warning',
      message: 'Last backup completed 48 hours ago',
      details: 'Database backup schedule has been interrupted. The last successful backup was completed 48 hours ago, exceeding the standard 24-hour backup policy. The backup service is running but encountered permission issues when accessing the storage volume.',
      timestamp: '2025-04-16T22:15:00Z',
      affectedSystems: ['Database Backup Service', 'Storage Volume B']
    },
    {
      id: '3',
      title: 'Payment Gateway',
      status: 'normal',
      message: 'Processing transactions normally',
      details: 'Payment gateway is operating at full capacity. Transaction processing times average 1.2 seconds, with a 99.98% success rate over the past 24 hours. No failed transactions have been reported by monitoring systems.',
      timestamp: '2025-04-17T08:45:00Z',
      affectedSystems: ['Payment Processing', 'Transaction Logging']
    },
    {
      id: '4',
      title: 'Security Scan',
      status: 'critical',
      message: 'Scheduled security scan skipped',
      details: 'The automated security scanning service failed to run its scheduled scan. This is the second consecutive missed scan, which may indicate configuration issues with the security scanning service. Manual intervention is required to diagnose and resolve the underlying issue.',
      timestamp: '2025-04-15T03:20:00Z',
      affectedSystems: ['Security Scanning Service', 'Vulnerability Management']
    }
  ];

  // Properly typed function for alert status icons
  const getAlertStatusIcon = (status: AlertStatus) => {
    switch (status) {
      case 'normal':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'critical':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const handleViewDetails = (alert: SystemAlert) => {
    setSelectedAlert(alert);
  };

  const getStatusColorClass = (status: AlertStatus) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="page-container">
      <NavBar userType="admin" />
      <main className="flex-1 bg-red-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={handleGoBack} className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">System Overview</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="h-[180px]">
              <CardContent className="p-6 h-full">
                <div className="flex justify-between items-start h-full">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Users</p>
                    <h3 className="text-2xl font-bold mt-1">{systemStats.totalUsers}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {systemStats.activeUsers} active
                    </p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-full">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="h-[180px]">
              <CardContent className="p-6 h-full">
                <div className="flex justify-between items-start h-full">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Products</p>
                    <h3 className="text-2xl font-bold mt-1">{systemStats.totalProducts}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Across all sellers
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-full">
                    <ShoppingBag className="h-8 w-8 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="h-[180px]">
              <CardContent className="p-6 h-full">
                <div className="flex justify-between items-start h-full">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Pending Approvals</p>
                    <h3 className="text-2xl font-bold mt-1">{systemStats.pendingApprovals}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Require action
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-full">
                    <UserCheck className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="h-[180px]">
              <CardContent className="p-6 h-full">
                <div className="flex justify-between items-start h-full">
                  <div>
                    <p className="text-sm font-medium text-gray-500">System Health</p>
                    <h3 className="text-2xl font-bold mt-1">Good</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      1 warning, 1 critical
                    </p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-full">
                    <Shield className="h-8 w-8 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2 h-[400px]">
              <CardHeader>
                <CardTitle>User Registration Trends</CardTitle>
                <CardDescription>
                  Monthly registration trends by user type
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[calc(100%-80px)]">
                <div className="h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={registrationData}
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
                      <Bar dataKey="buyers" name="Buyers" fill="#3b82f6" />
                      <Bar dataKey="sellers" name="Sellers" fill="#10b981" />
                      <Bar dataKey="middlemen" name="Middlemen" fill="#a855f7" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="h-[400px]">
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>
                  Breakdown of user types in the system
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[calc(100%-80px)]">
                <div className="h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {userDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>
                Current system status and alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemAlerts.map((alert) => (
                  <Card key={alert.id} className="hover:shadow-md transition-shadow h-[80px]">
                    <div className="p-4 flex items-center h-full">
                      {getAlertStatusIcon(alert.status)}
                      <div className="ml-4">
                        <h3 className="font-medium">{alert.title}</h3>
                        <p className="text-sm text-gray-600">{alert.message}</p>
                      </div>
                      <div className="ml-auto">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleViewDetails(alert)}
                          className="flex items-center gap-1"
                        >
                          <Info className="h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} MultiPortal. All rights reserved.
      </footer>

      {/* Alert Details Dialog */}
      <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedAlert && (
                <>
                  {getAlertStatusIcon(selectedAlert.status)}
                  {selectedAlert.title}
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedAlert?.message}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedAlert && (
              <>
                <div className={`p-4 rounded-md border ${getStatusColorClass(selectedAlert.status)}`}>
                  <div className="font-medium mb-2">Status: {selectedAlert.status.charAt(0).toUpperCase() + selectedAlert.status.slice(1)}</div>
                  <p className="text-sm">{selectedAlert.details}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold mb-2">Affected Systems</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAlert.affectedSystems?.map((system, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {system}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold mb-1">Last Updated</h4>
                  <p className="text-xs text-gray-600">
                    {selectedAlert.timestamp ? new Date(selectedAlert.timestamp).toLocaleString() : 'Unknown'}
                  </p>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OverviewPage;
