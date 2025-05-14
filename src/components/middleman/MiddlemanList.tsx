
import React from 'react';
import MiddlemanCard from './MiddlemanCard';
import { Middleman } from '@/types/middleman';

interface MiddlemanListProps {
  middlemen: Middleman[];
}

const MiddlemanList = ({ middlemen }: MiddlemanListProps) => {
  if (middlemen.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">No middlemen found matching your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {middlemen.map((middleman) => (
        <MiddlemanCard key={middleman.id} middleman={middleman} />
      ))}
    </div>
  );
};

export default MiddlemanList;
