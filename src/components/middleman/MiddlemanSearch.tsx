
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface MiddlemanSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const MiddlemanSearch = ({ searchTerm, onSearchChange }: MiddlemanSearchProps) => {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <Input
        placeholder="Search by name, expertise, or description..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 max-w-3xl"
      />
    </div>
  );
};

export default MiddlemanSearch;
