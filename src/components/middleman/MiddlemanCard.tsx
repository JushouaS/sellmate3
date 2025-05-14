import React from 'react';
import { BadgeCheck, CheckCircle2, UserCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Middleman } from '@/types/middleman';
import { toast } from "sonner";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from 'react';
import { useProductContext } from "@/ProductContext";

interface MiddlemanCardProps {
  middleman: Middleman;
}

const MiddlemanCard = ({ middleman }: MiddlemanCardProps) => {
  const { name, avatar, rating, expertise, description, transactions, successRate } = middleman;
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { products, addProduct } = useProductContext();
  
  const handleContact = () => {
    setContactDialogOpen(true);
  };

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }
    
    // If there are no products, add a sample product (for demo)
    if (products.length === 0) {
      addProduct({
        id: Date.now(),
        name: "Sample Product",
        description: "This is a sample product added when contacting a middleman.",
        price: "1000"
      });
    }
    
    toast.success(`Message sent to ${name}. They will respond shortly.`);
    setMessage("");
    setContactDialogOpen(false);
  };
  
  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <Avatar className="h-16 w-16 mr-4 border-2 border-blue-200">
              <AvatarImage src={avatar} />
              <AvatarFallback className="bg-blue-100 text-blue-800 text-lg">
                {name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center">
                <h3 className="font-bold text-lg mr-2">{name}</h3>
                <BadgeCheck className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {expertise.map((skill, index) => (
              <Badge key={index} variant="secondary" className="capitalize">
                {skill}
              </Badge>
            ))}
          </div>
          
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          
          <div className="flex justify-between items-center border-t pt-4 mt-2">
            <div className="flex items-center text-sm">
              <UserCheck className="h-4 w-4 mr-1 text-blue-500" />
              <span><strong>{transactions}</strong> Transactions</span>
            </div>
          </div>
          
          <div className="mt-4">
            <Button className="w-full" onClick={handleContact}>Contact Middleman</Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Contact {name}</DialogTitle>
            <DialogDescription>
              Send a message to this middleman about your transaction needs
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-blue-200">
                <AvatarImage src={avatar} />
                <AvatarFallback className="bg-blue-100 text-blue-800">
                  {name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{name}</p>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe the transaction you need help with..."
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setContactDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendMessage}>
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MiddlemanCard;
