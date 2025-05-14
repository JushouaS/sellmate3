import React from 'react';
import { NavBar } from "@/components/NavBar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  ArrowLeft, 
  Save, 
  Trash2, 
  Lock, 
  Bell, 
  Globe, 
  Mail, 
  Database, 
  Server, 
  Shield, 
  AlertCircle 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const SettingsPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/dashboard/admin');
  };
  
  const handleSaveChanges = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully",
    });
  };

  return (
    <div className="page-container">
      <NavBar userType="admin" />
      <main className="flex-1 bg-red-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={handleGoBack} className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
            </Button>
            <h1 className="text-3xl font-bold">Sellmate System Settings</h1>
          </div>

          <Card className="mb-8 border-2 border-red-100 shadow-md">
            <CardHeader className="bg-gradient-to-r from-red-50 to-white">
              <CardTitle>Configure System Settings</CardTitle>
              <CardDescription>
                Manage all aspects of the Sellmate platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="mb-6 bg-red-100">
                  <TabsTrigger value="general" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">General</TabsTrigger>
                  <TabsTrigger value="security" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">Security</TabsTrigger>
                  <TabsTrigger value="notifications" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">Notifications</TabsTrigger>
                  <TabsTrigger value="maintenance" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">Maintenance</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="mt-0 space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center">
                        <Globe className="h-5 w-5 mr-2 text-red-600" />
                        <CardTitle>Site Settings</CardTitle>
                      </div>
                      <CardDescription>
                        Configure general website settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="site-name">Site Name</Label>
                        <Input id="site-name" defaultValue="Sellmate" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="site-description">Site Description</Label>
                        <Input id="site-description" defaultValue="A platform connecting buyers and sellers through trusted middlemen" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="contact-email">Contact Email</Label>
                        <Input id="contact-email" defaultValue="support@sellmate.com" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="timezone">Default Timezone</Label>
                        <Select defaultValue="UTC">
                          <SelectTrigger id="timezone">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="UTC">UTC</SelectItem>
                            <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                            <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                            <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                            <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="maintenance-mode" />
                        <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button onClick={handleSaveChanges}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center">
                        <Settings className="h-5 w-5 mr-2 text-red-600" />
                        <CardTitle>System Features</CardTitle>
                      </div>
                      <CardDescription>
                        Enable or disable system features
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">User Registration</h4>
                          <p className="text-sm text-gray-500">Allow new users to register</p>
                        </div>
                        <Switch defaultChecked id="user-registration" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Messaging System</h4>
                          <p className="text-sm text-gray-500">In-app messaging between users</p>
                        </div>
                        <Switch defaultChecked id="messaging" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Reviews & Ratings</h4>
                          <p className="text-sm text-gray-500">Allow users to leave reviews</p>
                        </div>
                        <Switch defaultChecked id="reviews" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Dispute Resolution</h4>
                          <p className="text-sm text-gray-500">Enable dispute handling by middlemen</p>
                        </div>
                        <Switch defaultChecked id="disputes" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button onClick={handleSaveChanges}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="mt-0 space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center">
                        <Lock className="h-5 w-5 mr-2 text-red-600" />
                        <CardTitle>Security Settings</CardTitle>
                      </div>
                      <CardDescription>
                        Configure security settings for the platform
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-500">Require 2FA for all admin accounts</p>
                        </div>
                        <Switch defaultChecked id="admin-2fa" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-500">Require 2FA for all middleman accounts</p>
                        </div>
                        <Switch defaultChecked id="middleman-2fa" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-500">Enable 2FA option for all users</p>
                        </div>
                        <Switch defaultChecked id="user-2fa" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="password-policy">Password Policy</Label>
                        <Select defaultValue="strong">
                          <SelectTrigger id="password-policy">
                            <SelectValue placeholder="Select password policy" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">Basic (min. 8 characters)</SelectItem>
                            <SelectItem value="medium">Medium (min. 10 chars with numbers)</SelectItem>
                            <SelectItem value="strong">Strong (min. 12 chars with numbers, symbols)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                        <Input id="session-timeout" type="number" defaultValue="30" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button onClick={handleSaveChanges}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-red-600" />
                        <CardTitle>Account Verification</CardTitle>
                      </div>
                      <CardDescription>
                        Configure verification requirements for different account types
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Email Verification</h4>
                          <p className="text-sm text-gray-500">Require email verification for all accounts</p>
                        </div>
                        <Switch defaultChecked id="email-verification" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Seller Identity Verification</h4>
                          <p className="text-sm text-gray-500">Require ID documentation for seller accounts</p>
                        </div>
                        <Switch defaultChecked id="seller-verification" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Middleman Background Check</h4>
                          <p className="text-sm text-gray-500">Require enhanced verification for middlemen</p>
                        </div>
                        <Switch defaultChecked id="middleman-verification" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button onClick={handleSaveChanges}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications" className="mt-0 space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center">
                        <Bell className="h-5 w-5 mr-2 text-red-600" />
                        <CardTitle>Notification Settings</CardTitle>
                      </div>
                      <CardDescription>
                        Configure system notifications and alerts
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Email Notifications</h4>
                          <p className="text-sm text-gray-500">Send system alerts via email</p>
                        </div>
                        <Switch defaultChecked id="email-alerts" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">SMS Notifications</h4>
                          <p className="text-sm text-gray-500">Send critical alerts via SMS</p>
                        </div>
                        <Switch id="sms-alerts" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Admin Notifications</h4>
                          <p className="text-sm text-gray-500">Notify admins of critical system events</p>
                        </div>
                        <Switch defaultChecked id="admin-alerts" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="alert-email">Alert Email Address</Label>
                        <Input id="alert-email" defaultValue="alerts@sellmate.com" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button onClick={handleSaveChanges}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 mr-2 text-red-600" />
                        <CardTitle>Email Templates</CardTitle>
                      </div>
                      <CardDescription>
                        Configure system email templates
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="email-template">Email Template</Label>
                        <Select defaultValue="welcome">
                          <SelectTrigger id="email-template">
                            <SelectValue placeholder="Select template" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="welcome">Welcome Email</SelectItem>
                            <SelectItem value="verification">Email Verification</SelectItem>
                            <SelectItem value="password-reset">Password Reset</SelectItem>
                            <SelectItem value="transaction-complete">Transaction Complete</SelectItem>
                            <SelectItem value="dispute-notification">Dispute Notification</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email-subject">Email Subject</Label>
                        <Input id="email-subject" defaultValue="Welcome to Sellmate!" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email-content">Email Content</Label>
                        <textarea
                          id="email-content"
                          className="min-h-[200px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                          defaultValue="Welcome to Sellmate! We're excited to have you join our platform..."
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button onClick={handleSaveChanges}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Template
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="maintenance" className="mt-0 space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center">
                        <Database className="h-5 w-5 mr-2 text-red-600" />
                        <CardTitle>Database Management</CardTitle>
                      </div>
                      <CardDescription>
                        Database backup and maintenance options
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Automatic Backups</h4>
                          <p className="text-sm text-gray-500">Enable scheduled database backups</p>
                        </div>
                        <Switch defaultChecked id="auto-backups" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="backup-frequency">Backup Frequency</Label>
                        <Select defaultValue="daily">
                          <SelectTrigger id="backup-frequency">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="backup-retention">Backup Retention (days)</Label>
                        <Input id="backup-retention" type="number" defaultValue="30" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Database Optimization</h4>
                          <p className="text-sm text-gray-500">Enable periodic database optimization</p>
                        </div>
                        <Switch defaultChecked id="db-optimization" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">
                        <Database className="h-4 w-4 mr-2" />
                        Backup Now
                      </Button>
                      <Button onClick={handleSaveChanges}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Settings
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center">
                        <Server className="h-5 w-5 mr-2 text-red-600" />
                        <CardTitle>System Maintenance</CardTitle>
                      </div>
                      <CardDescription>
                        System cleanup and maintenance options
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Cache Management</h4>
                          <p className="text-sm text-gray-500">Automatically clear system cache</p>
                        </div>
                        <Switch defaultChecked id="auto-cache-clear" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="cache-interval">Cache Clear Interval (hours)</Label>
                        <Input id="cache-interval" type="number" defaultValue="24" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Log Rotation</h4>
                          <p className="text-sm text-gray-500">Enable automatic log rotation</p>
                        </div>
                        <Switch defaultChecked id="log-rotation" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="log-retention">Log Retention (days)</Label>
                        <Input id="log-retention" type="number" defaultValue="14" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear Cache Now
                      </Button>
                      <Button onClick={handleSaveChanges}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Settings
                      </Button>
                    </CardFooter>
                  </Card>
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

export default SettingsPage;
