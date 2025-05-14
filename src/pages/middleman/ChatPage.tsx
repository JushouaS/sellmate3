import React, { useState, useRef, useEffect } from 'react';
import { NavBar } from "@/components/NavBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, Phone, Image, Paperclip, ArrowLeft, Info, Clock } from "lucide-react";
import { ChatContact, ChatMessage } from "@/types/middleman";
import { useNavigate, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const ChatPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null);
  const [showPendingTransactions, setShowPendingTransactions] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const params = new URLSearchParams(location.search);
  const clientId = params.get('client');
  
  const [contacts, setContacts] = useState<ChatContact[]>([
    {
      id: "1",
      name: "Alex Gwapa",
      avatar: "",
      lastMessage: "Hi!",
      type: "buyer"
    },
    {
      id: "2",
      name: "Jushoua Oswald G. Santos",
      avatar: "",
      lastMessage: "Hi!",
      type: "seller"
    },
    {
      id: "3",
      name: "Maria Rodriguez",
      avatar: "",
      lastMessage: "Hello, I'm interested in your service",
      type: "buyer"
    },
    {
      id: "4",
      name: "Tech Gadgets Shop",
      avatar: "",
      lastMessage: "When can we proceed with the transaction?",
      type: "seller"
    }
  ]);
  
  const [pendingTransactions, setPendingTransactions] = useState([
    {
      id: "pt1",
      buyerName: "Alex Gwapa",
      sellerName: "Tech Gadgets Shop",
      item: "iPhone 15 Pro",
      price: "₱85,000",
      date: "2025-04-12"
    },
    {
      id: "pt2",
      buyerName: "Maria Rodriguez",
      sellerName: "Jushoua Oswald G. Santos",
      item: "Gaming Laptop",
      price: "₱65,500",
      date: "2025-04-15"
    }
  ]);

  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({
    "1": [
      { id: "m1", sender: "Alex Gwapa", senderType: "buyer", content: "Hi!", timestamp: new Date(Date.now() - 3600000) },
      { id: "m2", sender: "Me", senderType: "middleman", content: "Hello Alex! How can I help you today?", timestamp: new Date(Date.now() - 3500000) },
      { id: "m3", sender: "Alex Gwapa", senderType: "buyer", content: "I'm interested in purchasing a laptop from Tech Shop but want to ensure it's legitimate.", timestamp: new Date(Date.now() - 3400000) },
    ],
    "2": [
      { id: "m4", sender: "Jushoua Oswald G. Santos", senderType: "seller", content: "Hi! I have some products I'd like to sell through your platform.", timestamp: new Date(Date.now() - 7200000) },
      { id: "m5", sender: "Me", senderType: "middleman", content: "Hello Jushoua! That's great. Could you provide details about the products?", timestamp: new Date(Date.now() - 7100000) },
      { id: "m6", sender: "Jushoua Oswald G. Santos", senderType: "seller", content: "Sure, I have several electronics items including smartphones and tablets.", timestamp: new Date(Date.now() - 7000000) },
    ],
    "3": [
      { id: "m7", sender: "Maria Rodriguez", senderType: "buyer", content: "Hello, I'm interested in your service", timestamp: new Date(Date.now() - 10200000) },
      { id: "m8", sender: "Me", senderType: "middleman", content: "Hi Maria! Welcome to Sellmate. How may I assist you today?", timestamp: new Date(Date.now() - 10100000) },
    ],
    "4": [
      { id: "m9", sender: "Tech Gadgets Shop", senderType: "seller", content: "When can we proceed with the transaction?", timestamp: new Date(Date.now() - 86400000) },
      { id: "m10", sender: "Me", senderType: "middleman", content: "I'm just waiting for confirmation from the buyer. Should be ready by tomorrow.", timestamp: new Date(Date.now() - 82800000) },
    ]
  });

  const middlemanProfile = {
    name: "Jushoua Oswald G. Santos",
    email: "joshwoswald.santos@gmail.com",
    phone: "+639322222222",
    socialHandle: "@Maginooperosioningbastos",
    profession: "Programmer, Developer",
    avatar: "/lovable-uploads/a0248aef-fed3-4b14-b572-2feb6e9ffa76.png"
  };

  // Set the selected contact based on the clientId from URL or default to the first contact
  useEffect(() => {
    if (clientId) {
      const contact = contacts.find(c => c.id === clientId);
      if (contact) {
        setSelectedContact(contact);
      }
    }
  }, [clientId, contacts]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedContact, messages]);

  const handleSendMessage = () => {
    if (message.trim() && selectedContact) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: "Me",
        senderType: "middleman",
        content: message,
        timestamp: new Date()
      };

      setMessages(prevMessages => ({
        ...prevMessages,
        [selectedContact.id]: [...(prevMessages[selectedContact.id] || []), newMessage]
      }));
      
      setMessage("");
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBack = () => {
    navigate("/dashboard/middleman");
  };

  const filteredContacts = contacts.filter(contact => {
    // Filter by tab
    if (activeTab !== "all" && contact.type !== activeTab.toLowerCase()) return false;
    
    // Filter by search
    if (searchQuery && !contact.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const togglePendingTransactions = () => {
    setShowPendingTransactions(!showPendingTransactions);
  };

  const handleAttachClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedContact) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        const newMessage: ChatMessage = {
          id: Date.now().toString(),
          sender: "Me",
          senderType: "middleman",
          content: "[image]",
          imageUrl,
          timestamp: new Date()
        };
        setMessages(prevMessages => ({
          ...prevMessages,
          [selectedContact.id]: [...(prevMessages[selectedContact.id] || []), newMessage as ChatMessage]
        }));
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    }
  };

  return (
    <div className="page-container">
      <NavBar userType="middleman" />
      <main className="flex-1 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto p-0 md:p-4 h-[calc(100vh-8rem)] flex flex-col">
          {/* Back button */}
          <div className="px-4 py-2">
            <Button 
              variant="ghost" 
              className="mb-2 text-blue-600 hover:bg-blue-50 hover:text-blue-700 flex items-center"
              onClick={handleBack}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
            </Button>
          </div>
          
          <Card className="flex-1 border-blue-200 shadow-xl flex flex-col md:flex-row overflow-hidden">
            {/* Contacts List */}
            <div className="w-full md:w-1/4 border-r border-blue-100 flex flex-col bg-white">
              <div className="p-4 border-b border-blue-100 bg-white">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-blue-800">Chats</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-300 text-blue-600 hover:bg-blue-50 flex items-center"
                    onClick={togglePendingTransactions}
                  >
                    <Clock className="h-4 w-4 mr-1" />
                    Pending
                    <Badge className="ml-1 bg-blue-100 text-blue-800">{pendingTransactions.length}</Badge>
                  </Button>
                </div>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    className="pl-9 border-blue-200 focus:border-blue-400 focus:ring focus:ring-blue-200" 
                    placeholder="Search or Start new chat" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-3 bg-blue-100 w-full">
                    <TabsTrigger 
                      value="all" 
                      className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                    >
                      All
                    </TabsTrigger>
                    <TabsTrigger 
                      value="seller" 
                      className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                    >
                      Seller
                    </TabsTrigger>
                    <TabsTrigger 
                      value="buyer" 
                      className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                    >
                      Buyer
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Pending Transactions List */}
              {showPendingTransactions && (
                <div className="flex-1 overflow-y-auto bg-blue-50 border-b border-blue-100">
                  <div className="p-3 bg-blue-100 text-blue-800 font-medium flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Pending Transactions
                  </div>
                  {pendingTransactions.map(transaction => (
                    <div key={transaction.id} className="p-4 border-b border-blue-100 hover:bg-blue-100 cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-blue-800">{transaction.item}</span>
                        <span className="text-blue-700 font-medium">{transaction.price}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Buyer:</span> {transaction.buyerName}
                      </div>
                      <div className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Seller:</span> {transaction.sellerName}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center mt-2">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(transaction.date)}
                      </div>
                      <div className="flex mt-2 space-x-2">
                        <Button 
                          size="sm" 
                          className="w-full text-xs bg-blue-500 hover:bg-blue-600"
                        >
                          Start Transaction
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-xs border-blue-300 text-blue-600"
                        >
                          Details
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="text-xs border-red-300 text-white font-semibold"
                          onClick={e => {
                            e.stopPropagation();
                            setPendingTransactions(prev => prev.filter(pt => pt.id !== transaction.id));
                          }}
                        >
                          Decline
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Contacts */}
              <div className={`${showPendingTransactions ? 'hidden md:block md:flex-1' : 'flex-1'} overflow-y-auto bg-white`}>
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (
                    <div 
                      key={contact.id} 
                      className={`flex items-center p-4 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-100 ${selectedContact?.id === contact.id ? 'bg-blue-100' : ''}`}
                      onClick={() => setSelectedContact(contact)}
                    >
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage src={contact.avatar} />
                        <AvatarFallback className={`${contact.type === 'buyer' ? 'bg-blue-200 text-blue-700' : 'bg-green-200 text-green-700'}`}>
                          {contact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-semibold truncate">{contact.name}</h3>
                          <span className="text-xs text-gray-500">
                            {messages[contact.id]?.length > 0 
                              ? formatTime(messages[contact.id][messages[contact.id].length - 1].timestamp) 
                              : ''}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${contact.type === 'buyer' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'} capitalize`}>
                          {contact.type}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    No contacts found
                  </div>
                )}
              </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col">
              {selectedContact ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-blue-100 bg-white flex justify-between items-center">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={selectedContact.avatar} />
                        <AvatarFallback className={`${selectedContact.type === 'buyer' ? 'bg-blue-200 text-blue-700' : 'bg-green-200 text-green-700'}`}>
                          {selectedContact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-blue-800">{selectedContact.name}</h3>
                        <p className="text-xs text-gray-500 capitalize">{selectedContact.type}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {/* Removed Transaction Info and Phone buttons */}
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-blue-50/30 to-white">
                    {messages[selectedContact.id]?.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`flex mb-4 ${msg.senderType === 'middleman' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.senderType !== 'middleman' && (
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback className={`${msg.senderType === 'buyer' ? 'bg-blue-200 text-blue-700' : 'bg-green-200 text-green-700'}`}>
                              {msg.sender[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div 
                          className={`max-w-[70%] p-3 rounded-2xl ${
                            msg.senderType === 'middleman' 
                              ? 'bg-blue-500 text-white rounded-tr-none shadow-lg' 
                              : 'bg-white rounded-tl-none shadow-md'
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <p className="text-xs mt-1 opacity-70 text-right">
                            {formatTime(msg.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messageEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-3 border-t border-blue-100 bg-white flex items-center">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                      onClick={handleAttachClick}
                    >
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <div className="flex-1 mx-2 relative">
                      <Input 
                        className="pr-10 focus-visible:ring-blue-500 border-blue-200"
                        placeholder="Type your message" 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                      />
                    </div>
                    <Button 
                      className="bg-blue-500 hover:bg-blue-600 transition-colors"
                      size="icon" 
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col md:flex-row">
                  {/* Welcome/Empty state */}
                  <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
                    <div className="text-center p-6">
                      <div className="mb-4 bg-blue-100 p-6 rounded-full inline-block">
                        <Search className="h-12 w-12 text-blue-500" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-blue-800">Select a contact</h3>
                      <p className="text-gray-500 max-w-md">
                        Choose a buyer or seller from the list to start chatting and facilitating transactions
                      </p>
                    </div>
                  </div>
                  
                  {/* Middleman profile */}
                  <div className="w-full md:w-72 border-l border-blue-100 bg-white p-6 flex flex-col items-center">
                    <Avatar className="h-32 w-32 mb-4 border-4 border-blue-200">
                      <AvatarImage src={middlemanProfile.avatar} />
                      <AvatarFallback className="bg-blue-200 text-blue-700 text-3xl">
                        {middlemanProfile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold text-center mb-1 text-blue-800">{middlemanProfile.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{middlemanProfile.email}</p>
                    <div className="w-full space-y-3">
                      <div className="bg-blue-500 text-white p-3 rounded-md text-center overflow-hidden text-ellipsis">
                        {middlemanProfile.phone}
                      </div>
                      <div className="bg-blue-500 text-white p-3 rounded-md text-center overflow-hidden text-ellipsis">
                        {middlemanProfile.socialHandle}
                      </div>
                      <div className="bg-blue-500 text-white p-3 rounded-md text-center">
                        {middlemanProfile.profession}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Middleman profile sidebar (when chat is active) */}
            {selectedContact && (
              <div className="hidden lg:block w-72 border-l border-blue-100 bg-white">
                <div className="p-6 flex flex-col items-center">
                  <Avatar className="h-32 w-32 mb-4 border-4 border-blue-200">
                    <AvatarImage src={middlemanProfile.avatar} />
                    <AvatarFallback className="bg-blue-200 text-blue-700 text-3xl">
                      {middlemanProfile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold text-center mb-1 text-blue-800">{middlemanProfile.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{middlemanProfile.email}</p>
                  <div className="w-full space-y-3">
                    <div className="bg-blue-500 text-white p-3 rounded-md text-center overflow-hidden text-ellipsis">
                      {middlemanProfile.phone}
                    </div>
                    <div className="bg-blue-500 text-white p-3 rounded-md text-center overflow-hidden text-ellipsis">
                      {middlemanProfile.socialHandle}
                    </div>
                    <div className="bg-blue-500 text-white p-3 rounded-md text-center">
                      {middlemanProfile.profession}
                    </div>
                  </div>
                  <div className="mt-6 w-full space-y-3">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-colors">
                      Transaction Details
                    </Button>
                    <Button variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-50">
                      Close Transaction
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>
      <footer className="bg-gradient-to-r from-blue-100 to-blue-200 py-4 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Sellmate. All rights reserved.
      </footer>
    </div>
  );
};

export default ChatPage;
