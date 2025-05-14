import { NavBar } from "@/components/NavBar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ShoppingBag, Package, CreditCard, UserCheck, MessageCircle, Eye, CheckCircle, Clock, XCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import React from "react";
import { useProductContext } from "@/ProductContext";
import { useOrderContext } from "@/OrderContext";
import { motion } from "framer-motion";

const initialOrders = [
  {
    id: '1',
    orderNumber: 'ORDER-12345',
    date: '2023-10-15',
    status: 'delivered',
    total: 8399.44,
    items: 2,
    productName: '',
  },
  {
    id: '2',
    orderNumber: 'ORDER-12346',
    date: '2023-11-02',
    status: 'pending',
    total: 4479.44,
    items: 1,
    productName: '',
  },
  {
    id: '3',
    orderNumber: 'ORDER-12347',
    date: '2023-11-20',
    status: 'pending',
    total: 16799.44,
    items: 3,
    productName: '',
  }
];

function getStatusColor(status) {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'delivered': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const { products, addProduct } = useProductContext();
  const { orders, addOrder } = useOrderContext();
  const dashboardCards = [
    {
      title: "Add Product",
      description: "List a new product for sale",
      icon: <Package className="h-10 w-10 text-blue-500" />,
      action: "addProduct"
    },
    {
      title: "Messages",
      description: "Chat with middlemen and sellers",
      icon: <MessageCircle className="h-10 w-10 text-blue-500" />,
      link: "/dashboard/buyer/chat"
    },
    {
      title: "Payment Methods",
      description: "Manage your payment information",
      icon: <CreditCard className="h-10 w-10 text-blue-500" />,
      link: "/dashboard/buyer/payment-methods"
    },
  ];

  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [addProductOpen, setAddProductOpen] = React.useState(false);
  const [productForm, setProductForm] = React.useState({ name: '', description: '', price: '' });

  const handleProductFormChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductFormSubmit = (e) => {
    e.preventDefault();
    addProduct({
      name: productForm.name,
      description: productForm.description,
      price: productForm.price,
      id: Date.now(),
    });
    // Add a new order for this product
    const randomOrderNumber = `ORDER-${Math.floor(10000 + Math.random() * 90000)}`;
    addOrder({
      id: Date.now().toString(),
      orderNumber: randomOrderNumber,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      total: parseFloat(productForm.price),
      items: 1,
      productName: productForm.name,
    });
    setAddProductOpen(false);
    setProductForm({ name: '', description: '', price: '' });
    navigate('/dashboard/buyer/middlemen');
  };

  return (
    <div className="page-container">
      <NavBar userType="buyer" />
      <main className="flex-1 bg-blue-50">
        <div className="container mx-auto px-4 py-8">
          {/* <h1 className="text-3xl font-bold mb-8">Buyer Dashboard</h1> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 place-items-center">
            {dashboardCards.map((card, index) => (
              card.action === "addProduct" ? (
                <Card
                  key={index}
                  className="dashboard-card w-[380px] h-[260px] flex items-center justify-center cursor-pointer border border-gray-200 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-200"
                  onClick={() => setAddProductOpen(true)}
                >
                  <div className="flex flex-col items-center text-center gap-5 w-full">
                    <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-2">
                      {React.cloneElement(card.icon, { className: 'h-12 w-12 text-blue-500' })}
                    </span>
                    <h2 className="text-2xl font-semibold">{card.title}</h2>
                    <p className="text-gray-600 text-base">{card.description}</p>
                  </div>
                </Card>
              ) : (
                <Link to={card.link} key={index}>
                  <Card className="dashboard-card w-[380px] h-[260px] flex items-center justify-center cursor-pointer border border-gray-200 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-200">
                    <div className="flex flex-col items-center text-center gap-5 w-full">
                      <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-2">
                        {React.cloneElement(card.icon, { className: 'h-12 w-12 text-blue-500' })}
                      </span>
                      <h2 className="text-2xl font-semibold">{card.title}</h2>
                      <p className="text-gray-600 text-base">{card.description}</p>
                    </div>
                  </Card>
                </Link>
              )
            ))}
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <Card className="p-6">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="delivered">Delivered</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-0">
                <OrdersList orders={orders} getStatusColor={getStatusColor} setSelectedOrder={setSelectedOrder} setDialogOpen={setDialogOpen} />
              </TabsContent>
              <TabsContent value="pending" className="mt-0">
                <OrdersList orders={orders.filter(order => order.status === 'pending')} getStatusColor={getStatusColor} setSelectedOrder={setSelectedOrder} setDialogOpen={setDialogOpen} />
              </TabsContent>
              <TabsContent value="delivered" className="mt-0">
                <OrdersList orders={orders.filter(order => order.status === 'delivered')} getStatusColor={getStatusColor} setSelectedOrder={setSelectedOrder} setDialogOpen={setDialogOpen} />
              </TabsContent>
            </Tabs>
          </Card>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="max-w-md p-8 rounded-2xl shadow-2xl flex flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100">
              {selectedOrder && (
                <>
                  <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg">
                    {selectedOrder.status === 'delivered' ? (
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    ) : (
                      <Clock className="w-10 h-10 text-yellow-500" />
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-blue-800 mb-2 text-center">Order Details</h2>
                  <div className="w-full text-left space-y-2 mb-4">
                    <div><span className="font-semibold text-blue-700">Order Number:</span> {selectedOrder.orderNumber}</div>
                    <div><span className="font-semibold text-blue-700">Date:</span> {new Date(selectedOrder.date).toLocaleDateString()}</div>
                    <div className="flex items-center gap-2"><span className="font-semibold text-blue-700">Status:</span> <span className={`px-2 py-1 rounded-full text-xs font-semibold ${selectedOrder.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}</span></div>
                    <div><span className="font-semibold text-blue-700">Amount:</span> ₱{selectedOrder.total.toFixed(2)}</div>
                    <div><span className="font-semibold text-blue-700">Items:</span> {selectedOrder.items}</div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold shadow text-base py-2 rounded-lg mt-2" onClick={() => setDialogOpen(false)}>
                    Close
                  </Button>
                </>
              )}
            </DialogContent>
          </Dialog>
          <Dialog open={addProductOpen} onOpenChange={setAddProductOpen}>
            <DialogContent className="bg-white rounded-2xl shadow-2xl p-8">
              {/* Top Gradient Bar */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-t-2xl" />
              {/* 3D Animated Icon */}
              <div className="flex justify-center mb-4 mt-2">
                <motion.div
                  initial={{ rotateY: -30, scale: 0.8 }}
                  animate={{ rotateY: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  <svg className="w-12 h-12 text-blue-600 drop-shadow-lg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="20" width="48" height="32" rx="6" fill="#6366F1" />
                    <rect x="8" y="20" width="48" height="32" rx="6" fill="url(#paint0_linear)" />
                    <rect x="16" y="12" width="32" height="16" rx="4" fill="#3B82F6" />
                    <rect x="16" y="12" width="32" height="16" rx="4" fill="url(#paint1_linear)" />
                    <circle cx="20" cy="28" r="2" fill="#fff" />
                    <circle cx="44" cy="28" r="2" fill="#fff" />
                    <defs>
                      <linearGradient id="paint0_linear" x1="8" y1="20" x2="56" y2="52" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#6366F1" />
                        <stop offset="1" stopColor="#A21CAF" />
                      </linearGradient>
                      <linearGradient id="paint1_linear" x1="16" y1="12" x2="48" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#3B82F6" />
                        <stop offset="1" stopColor="#6366F1" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
              </div>
              <h2 className="text-2xl font-extrabold mb-2 text-gray-900 text-center">Add New Product</h2>
              <p className="text-gray-500 text-center mb-6">Fill in the details below to add a new product to your store.</p>
              <form className="space-y-5" onSubmit={handleProductFormSubmit}>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="product-name">Product Name</label>
                  <input
                    id="product-name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-50"
                    value={productForm.name}
                    onChange={handleProductFormChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="product-description">Description</label>
                  <textarea
                    id="product-description"
                    name="description"
                    required
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-[80px] bg-gray-50"
                    value={productForm.description}
                    onChange={handleProductFormChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="product-price">Price</label>
                  <input
                    id="product-price"
                    name="price"
                    type="text"
                    inputMode="decimal"
                    pattern="^[0-9]*[.,]?[0-9]*$"
                    required
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-50"
                    value={productForm.price}
                    onChange={handleProductFormChange}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition transform hover:scale-105 active:scale-95"
                >
                  Add Product
                </button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </main>
      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Sellmate. All rights reserved.
      </footer>
    </div>
  );
};

function OrdersList({ orders, getStatusColor, setSelectedOrder, setDialogOpen }) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500">No orders found</p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id} className="overflow-hidden border-l-4 hover:shadow-md transition-shadow">
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="md:col-span-2">
              <div className="flex items-center">
                <ShoppingBag className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <h3 className="font-bold">{order.orderNumber}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                  {order.productName && (
                    <p className="text-sm text-gray-700 font-medium mt-1">{order.productName}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="text-center">
              <Badge className={getStatusColor(order.status)}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>
            <div className="text-center">
              <p className="font-medium">₱{order.total.toFixed(2)}</p>
              <p className="text-sm text-gray-500">{order.items} item{order.items !== 1 ? 's' : ''}</p>
            </div>
            <div className="text-right">
              <Button variant="outline" size="sm" onClick={() => { setSelectedOrder(order); setDialogOpen(true); }}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default BuyerDashboard;
