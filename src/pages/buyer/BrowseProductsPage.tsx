import React, { useState } from 'react';
import { NavBar } from "@/components/NavBar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

const BrowseProductsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const products: Product[] = [
    {
      id: '1',
      name: 'Premium Headphones',
      price: 299.99,
      image: '/lovable-uploads/e0f77b0f-875e-4f04-9508-7fd4610e69cf.png',
      category: 'electronics',
      description: 'High-quality noise-canceling headphones'
    },
    {
      id: '2',
      name: 'Smartphone XL',
      price: 899.99,
      image: '/lovable-uploads/e0f77b0f-875e-4f04-9508-7fd4610e69cf.png',
      category: 'electronics',
      description: 'Latest model with advanced features'
    },
    {
      id: '3',
      name: 'Designer T-shirt',
      price: 49.99,
      image: '/lovable-uploads/e0f77b0f-875e-4f04-9508-7fd4610e69cf.png',
      category: 'clothing',
      description: 'Premium cotton with unique design'
    },
    {
      id: '4',
      name: 'Running Shoes',
      price: 129.99,
      image: '/lovable-uploads/e0f77b0f-875e-4f04-9508-7fd4610e69cf.png',
      category: 'clothing',
      description: 'Lightweight and durable for daily runs'
    },
    {
      id: '5',
      name: 'Coffee Maker',
      price: 89.99,
      image: '/lovable-uploads/e0f77b0f-875e-4f04-9508-7fd4610e69cf.png',
      category: 'home',
      description: 'Programmable with multiple brewing options'
    },
    {
      id: '6',
      name: 'Scented Candles (Set of 3)',
      price: 24.99,
      image: '/lovable-uploads/e0f77b0f-875e-4f04-9508-7fd4610e69cf.png',
      category: 'home',
      description: 'Long-lasting with calming fragrance'
    }
  ];

  const handleGoBack = () => {
    navigate('/dashboard/buyer');
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <NavBar userType="buyer" />
      <main className="flex-1 bg-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={handleGoBack} className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
            </Button>
            <h1 className="text-3xl font-bold">Browse Products</h1>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Find Your Perfect Products</CardTitle>
              <CardDescription>
                Explore our catalog and discover quality items
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-md"
                />
              </div>
              
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All Products</TabsTrigger>
                  <TabsTrigger value="electronics">Electronics</TabsTrigger>
                  <TabsTrigger value="clothing">Clothing</TabsTrigger>
                  <TabsTrigger value="home">Home & Living</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="electronics" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts
                      .filter(product => product.category === 'electronics')
                      .map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="clothing" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts
                      .filter(product => product.category === 'clothing')
                      .map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="home" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts
                      .filter(product => product.category === 'home')
                      .map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} MultiPortal. All rights reserved.
      </footer>
    </div>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="relative">
        <ShoppingBag className="h-32 w-full object-cover p-4 bg-gray-100" />
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 rounded-full"
          onClick={toggleWishlist}
        >
          <Heart 
            className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} 
          />
        </Button>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="font-semibold text-lg">${product.price}</span>
          <Button size="sm">
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrowseProductsPage;
