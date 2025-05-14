import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { BackButton } from "@/components/ui/back-button";
import { NavBar } from "@/components/NavBar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { middlemenData } from '@/data/middlemen';
import { Middleman } from '@/types/middleman';
import MiddlemanList from '@/components/middleman/MiddlemanList';
import MiddlemanSearch from '@/components/middleman/MiddlemanSearch';
import { ProductProvider } from "@/ProductContext";

const BrowseMiddlemenPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleGoBack = () => {
    navigate('/dashboard/buyer');
  };

  const filteredMiddlemen = middlemenData.filter(middleman => 
    middleman.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    middleman.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    middleman.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filterByExpertise = (categories: string[]) => {
    return filteredMiddlemen.filter(middleman => 
      middleman.expertise.some(skill => categories.includes(skill))
    );
  };

  return (
    <ProductProvider>
      <div className="page-container">
        <NavBar userType="buyer" />
        <main className="flex-1 bg-blue-50">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-6">
              <BackButton />
              <h1 className="text-3xl font-bold ml-2">Browse Middlemen</h1>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Find Trusted Middlemen</CardTitle>
                <CardDescription>
                  Browse experienced middlemen who can help secure your transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MiddlemanSearch 
                  searchTerm={searchTerm} 
                  onSearchChange={setSearchTerm} 
                />
                
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger value="all">All Experts</TabsTrigger>
                    <TabsTrigger value="electronics">Electronics</TabsTrigger>
                    <TabsTrigger value="fashion">Fashion & Luxury</TabsTrigger>
                    <TabsTrigger value="home">Home & Living</TabsTrigger>
                    <TabsTrigger value="automotive">Automotive</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="mt-0">
                    <MiddlemanList middlemen={filteredMiddlemen} />
                  </TabsContent>

                  <TabsContent value="electronics" className="mt-0">
                    <MiddlemanList 
                      middlemen={filterByExpertise(['electronics', 'technology', 'gadgets'])} 
                    />
                  </TabsContent>

                  <TabsContent value="fashion" className="mt-0">
                    <MiddlemanList 
                      middlemen={filterByExpertise(['fashion', 'luxury', 'collectibles'])} 
                    />
                  </TabsContent>

                  <TabsContent value="home" className="mt-0">
                    <MiddlemanList 
                      middlemen={filterByExpertise(['home', 'furniture', 'real estate'])} 
                    />
                  </TabsContent>

                  <TabsContent value="automotive" className="mt-0">
                    <MiddlemanList 
                      middlemen={filterByExpertise(['automotive', 'vehicles', 'parts'])} 
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
      </div>
    </ProductProvider>
  );
};

export default BrowseMiddlemenPage;
