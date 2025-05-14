import React from 'react';
import { NavBar } from "@/components/NavBar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store, ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  status: 'active' | 'sold';
}

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Premium Headphones',
      price: 299.99,
      category: 'Electronics',
      status: 'active',
    },
    {
      id: '2',
      name: 'Smartphone XL',
      price: 899.99,
      category: 'Electronics',
      status: 'active',
    },
    {
      id: '3',
      name: 'Designer T-shirt',
      price: 49.99,
      category: 'Clothing',
      status: 'sold',
    },
    {
      id: '4',
      name: 'Running Shoes',
      price: 129.99,
      category: 'Clothing',
      status: 'sold',
    }
  ]);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [editPrice, setEditPrice] = useState('');
  const [editStatus, setEditStatus] = useState<'active' | 'sold'>('active');

  const handleGoBack = () => {
    navigate('/dashboard/seller');
  };

  const getStatusBadge = (status: Product['status']) => {
    switch (status) {
      case 'active': return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'sold': return <Badge className="bg-blue-100 text-blue-800">Sold</Badge>;
      default: return <Badge>Unknown</Badge>;
    }
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setEditPrice(product.price.toString());
    setEditStatus(product.status);
  };
  const handleEditSave = () => {
    if (!editProduct) return;
    setProducts(products.map(p => p.id === editProduct.id ? { ...p, price: parseFloat(editPrice), status: editStatus } : p));
    setEditProduct(null);
  };
  const handleDelete = (product: Product) => setDeleteProduct(product);
  const handleDeleteConfirm = () => {
    if (!deleteProduct) return;
    setProducts(products.filter(p => p.id !== deleteProduct.id));
    setDeleteProduct(null);
  };

  return (
    <div className="page-container">
      <NavBar userType="seller" />
      <main className="flex-1 bg-green-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Button variant="ghost" onClick={handleGoBack} className="mr-2">
                <ArrowLeft className="h-4 w-4 mr-2" />
              </Button>
              <h1 className="text-3xl font-bold">My Products</h1>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Manage Your Product Catalog</CardTitle>
              <CardDescription>
                Add, edit, and organize your product listings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All Products</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="sold">Sold</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-0">
                  <ProductsList 
                    products={products} 
                    getStatusBadge={getStatusBadge} 
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </TabsContent>

                <TabsContent value="active" className="mt-0">
                  <ProductsList 
                    products={products.filter(product => product.status === 'active')} 
                    getStatusBadge={getStatusBadge} 
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </TabsContent>

                <TabsContent value="sold" className="mt-0">
                  <ProductsList 
                    products={products.filter(product => product.status === 'sold')} 
                    getStatusBadge={getStatusBadge} 
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          {/* Edit Modal */}
          <Dialog open={!!editProduct} onOpenChange={open => !open && setEditProduct(null)}>
            <DialogContent className="max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit Product</h2>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Price</label>
                <Input type="text" value={editPrice} onChange={e => setEditPrice(e.target.value)} />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Status</label>
                <select className="w-full border rounded px-3 py-2" value={editStatus} onChange={e => setEditStatus(e.target.value as 'active' | 'sold')}>
                  <option value="active">Active</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditProduct(null)}>Cancel</Button>
                <Button onClick={handleEditSave}>Save</Button>
              </div>
            </DialogContent>
          </Dialog>
          {/* Delete Confirmation Dialog */}
          <Dialog open={!!deleteProduct} onOpenChange={open => !open && setDeleteProduct(null)}>
            <DialogContent className="max-w-md">
              <h2 className="text-xl font-bold mb-4 text-red-600">Delete Product</h2>
              <p>Are you sure you want to delete <span className="font-semibold">{deleteProduct?.name}</span>? This action cannot be undone.</p>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setDeleteProduct(null)}>Cancel</Button>
                <Button variant="destructive" onClick={handleDeleteConfirm}>Delete</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} MultiPortal. All rights reserved.
      </footer>
    </div>
  );
};

const ProductsList = ({ 
  products, 
  getStatusBadge, 
  onEdit,
  onDelete
}: { 
  products: Product[],
  getStatusBadge: (status: Product['status']) => React.ReactNode,
  onEdit: (product: Product) => void,
  onDelete: (product: Product) => void
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <Store className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-sm text-gray-500">
            <th className="text-left py-3 px-4">Product</th>
            <th className="text-left py-3 px-4">Category</th>
            <th className="text-left py-3 px-4">Price</th>
            <th className="text-left py-3 px-4">Status</th>
            <th className="text-right py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">{product.name}</td>
              <td className="py-3 px-4 text-gray-600">{product.category}</td>
              <td className="py-3 px-4">₱{product.price.toFixed(2)}</td>
              <td className="py-3 px-4">{getStatusBadge(product.status)}</td>
              <td className="py-3 px-4 text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => onEdit(product)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700" onClick={() => onDelete(product)}>
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

export default ProductsPage;
