import React, { useState } from 'react';
import { NavBar } from "@/components/NavBar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ArrowLeft, Search, UserPlus, Edit, Trash2, Lock, Shield, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from "@/components/ui/table";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller' | 'middleman' | 'admin';
  status: 'active' | 'suspended' | 'pending';
  registeredOn: string;
  lastActive: string;
  verified: boolean;
}

const editUserSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  role: z.enum(['buyer', 'seller', 'middleman', 'admin'], {
    required_error: "Please select a role.",
  }),
  status: z.enum(['active', 'suspended', 'pending'], {
    required_error: "Please select a status.",
  }),
});

const UsersPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);

  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      role: 'buyer',
      status: 'active',
      registeredOn: '2023-06-15',
      lastActive: '2023-11-18',
      verified: true
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      role: 'buyer',
      status: 'active',
      registeredOn: '2023-07-22',
      lastActive: '2023-11-15',
      verified: true
    },
    {
      id: '3',
      name: 'Tech Shop Inc.',
      email: 'support@techshop.com',
      role: 'seller',
      status: 'active',
      registeredOn: '2023-05-10',
      lastActive: '2023-11-19',
      verified: true
    },
    {
      id: '4',
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      role: 'middleman',
      status: 'active',
      registeredOn: '2023-08-05',
      lastActive: '2023-11-17',
      verified: true
    },
    {
      id: '5',
      name: 'Emma Wilson',
      email: 'emma.wilson@example.com',
      role: 'buyer',
      status: 'suspended',
      registeredOn: '2023-09-12',
      lastActive: '2023-10-25',
      verified: true
    },
    {
      id: '6',
      name: 'Robert Davis',
      email: 'robert.davis@example.com',
      role: 'seller',
      status: 'pending',
      registeredOn: '2023-11-10',
      lastActive: '2023-11-10',
      verified: false
    },
    {
      id: '7',
      name: 'Admin User',
      email: 'admin@multiportal.com',
      role: 'admin',
      status: 'active',
      registeredOn: '2023-01-01',
      lastActive: '2023-11-19',
      verified: true
    }
  ]);

  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "buyer",
      status: "active",
    },
  });

  const handleGoBack = () => {
    navigate('/dashboard/admin');
  };

  const handleAddUser = () => {
    setShowAddUserDialog(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    form.reset({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setShowEditDialog(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setShowDeleteDialog(true);
  };

  const handleStatusAction = (user: User, action: 'suspend' | 'reactivate' | 'approve' | 'reject') => {
    const updatedUsers = users.map(u => {
      if (u.id === user.id) {
        let newStatus: 'active' | 'suspended' | 'pending' = u.status;
        
        switch (action) {
          case 'suspend':
            newStatus = 'suspended';
            toast({
              title: "User Suspended",
              description: `${user.name} has been suspended.`,
            });
            break;
          case 'reactivate':
            newStatus = 'active';
            toast({
              title: "User Reactivated",
              description: `${user.name} has been reactivated.`,
            });
            break;
          case 'approve':
            newStatus = 'active';
            toast({
              title: "User Approved",
              description: `${user.name} has been approved.`,
            });
            break;
          case 'reject':
            toast({
              title: "User Rejected",
              description: `${user.name} has been rejected.`,
              variant: "destructive"
            });
            break;
        }
        
        return { ...u, status: newStatus };
      }
      return u;
    });
    
    setUsers(updatedUsers);
  };

  const confirmDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter(user => user.id !== selectedUser.id));
      setShowDeleteDialog(false);
      setSelectedUser(null);
      toast({
        title: "User Deleted",
        description: `${selectedUser.name} has been removed from the system.`,
        variant: "destructive"
      });
    }
  };

  const handleEditSubmit = (values: z.infer<typeof editUserSchema>) => {
    if (selectedUser) {
      setUsers(users.map(user => {
        if (user.id === selectedUser.id) {
          return {
            ...user,
            name: values.name,
            email: values.email,
            role: values.role,
            status: values.status,
          };
        }
        return user;
      }));
      
      setShowEditDialog(false);
      toast({
        title: "User Updated",
        description: `${values.name}'s information has been updated successfully.`,
      });
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role: User['role']) => {
    switch (role) {
      case 'buyer': return <Badge className="bg-blue-100 text-blue-800">Buyer</Badge>;
      case 'seller': return <Badge className="bg-green-100 text-green-800">Seller</Badge>;
      case 'middleman': return <Badge className="bg-purple-100 text-purple-800">Middleman</Badge>;
      case 'admin': return <Badge className="bg-red-100 text-red-800">Admin</Badge>;
      default: return <Badge>Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: User['status']) => {
    switch (status) {
      case 'active': return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'suspended': return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
      case 'pending': return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default: return <Badge>Unknown</Badge>;
    }
  };

  const getStatusActions = (user: User) => {
    switch (user.status) {
      case 'active':
        return (
          <Button 
            variant="outline" 
            size="sm" 
            className="text-yellow-600"
            onClick={() => handleStatusAction(user, 'suspend')}
          >
            <Lock className="h-4 w-4 mr-2" />
            Suspend
          </Button>
        );
      case 'suspended':
        return (
          <Button 
            variant="outline" 
            size="sm" 
            className="text-green-600"
            onClick={() => handleStatusAction(user, 'reactivate')}
          >
            <Check className="h-4 w-4 mr-2" />
            Reactivate
          </Button>
        );
      case 'pending':
        return (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-green-600"
              onClick={() => handleStatusAction(user, 'approve')}
            >
              <Check className="h-4 w-4 mr-2" />
              Approve
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-red-600"
              onClick={() => handleStatusAction(user, 'reject')}
            >
              <X className="h-4 w-4 mr-2" />
              Reject
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

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
              <h1 className="text-3xl font-bold">User Management</h1>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Users</CardTitle>
                  <CardDescription>
                    Manage all users in the system
                  </CardDescription>
                </div>
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search users..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All Users</TabsTrigger>
                  <TabsTrigger value="buyers">Buyers</TabsTrigger>
                  <TabsTrigger value="sellers">Sellers</TabsTrigger>
                  <TabsTrigger value="middlemen">Middlemen</TabsTrigger>
                  <TabsTrigger value="admins">Admins</TabsTrigger>
                  <TabsTrigger value="pending">Pending Approval</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-0">
                  <UsersTable 
                    users={filteredUsers} 
                    getRoleBadge={getRoleBadge} 
                    getStatusBadge={getStatusBadge}
                    getStatusActions={getStatusActions}
                    onEdit={handleEditUser}
                    onDelete={handleDeleteUser}
                  />
                </TabsContent>

                <TabsContent value="buyers" className="mt-0">
                  <UsersTable 
                    users={filteredUsers.filter(user => user.role === 'buyer')} 
                    getRoleBadge={getRoleBadge} 
                    getStatusBadge={getStatusBadge}
                    getStatusActions={getStatusActions}
                    onEdit={handleEditUser}
                    onDelete={handleDeleteUser}
                  />
                </TabsContent>

                <TabsContent value="sellers" className="mt-0">
                  <UsersTable 
                    users={filteredUsers.filter(user => user.role === 'seller')} 
                    getRoleBadge={getRoleBadge} 
                    getStatusBadge={getStatusBadge}
                    getStatusActions={getStatusActions}
                    onEdit={handleEditUser}
                    onDelete={handleDeleteUser}
                  />
                </TabsContent>

                <TabsContent value="middlemen" className="mt-0">
                  <UsersTable 
                    users={filteredUsers.filter(user => user.role === 'middleman')} 
                    getRoleBadge={getRoleBadge} 
                    getStatusBadge={getStatusBadge}
                    getStatusActions={getStatusActions}
                    onEdit={handleEditUser}
                    onDelete={handleDeleteUser}
                  />
                </TabsContent>

                <TabsContent value="admins" className="mt-0">
                  <UsersTable 
                    users={filteredUsers.filter(user => user.role === 'admin')} 
                    getRoleBadge={getRoleBadge} 
                    getStatusBadge={getStatusBadge}
                    getStatusActions={getStatusActions}
                    onEdit={handleEditUser}
                    onDelete={handleDeleteUser}
                  />
                </TabsContent>

                <TabsContent value="pending" className="mt-0">
                  <UsersTable 
                    users={filteredUsers.filter(user => user.status === 'pending')} 
                    getRoleBadge={getRoleBadge} 
                    getStatusBadge={getStatusBadge}
                    getStatusActions={getStatusActions}
                    onEdit={handleEditUser}
                    onDelete={handleDeleteUser}
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

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDeleteUser}>Delete User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update information and permissions for {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEditSubmit)} className="space-y-4 py-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="User name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="buyer">Buyer</SelectItem>
                        <SelectItem value="seller">Seller</SelectItem>
                        <SelectItem value="middleman">Middleman</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Enter the details for the new user.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              This dialog is a placeholder. In a complete implementation, you would add form fields here.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => {
              setShowAddUserDialog(false);
              toast({
                title: "User Added",
                description: "New user has been added successfully."
              });
            }}>
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface UsersTableProps {
  users: User[];
  getRoleBadge: (role: User['role']) => React.ReactNode;
  getStatusBadge: (status: User['status']) => React.ReactNode;
  getStatusActions: (user: User) => React.ReactNode;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UsersTable = ({ users, getRoleBadge, getStatusBadge, getStatusActions, onEdit, onDelete }: UsersTableProps) => {
  if (users.length === 0) {
    return (
      <div className="text-center py-8">
        <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500">No users found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Registered On</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                <div className="flex items-center">
                  {user.name}
                  {user.role === 'admin' && (
                    <Shield className="h-4 w-4 text-red-500 ml-2" />
                  )}
                </div>
              </TableCell>
              <TableCell className="text-gray-600">{user.email}</TableCell>
              <TableCell>{getRoleBadge(user.role)}</TableCell>
              <TableCell>{getStatusBadge(user.status)}</TableCell>
              <TableCell className="text-gray-600">{new Date(user.registeredOn).toLocaleDateString()}</TableCell>
              <TableCell className="text-gray-600">{new Date(user.lastActive).toLocaleDateString()}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {getStatusActions(user)}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onEdit(user)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  {user.role !== 'admin' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600"
                      onClick={() => onDelete(user)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersPage;
