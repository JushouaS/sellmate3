
import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  size?: number;
  className?: string;
}

const RatingStars = ({ rating, size = 16, className = '' }: RatingStarsProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`h-${size/4} w-${size/4} transition-all ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
                      ${i === Math.floor(rating) && rating % 1 > 0 ? 'text-yellow-400 fill-yellow-400 opacity-70' : ''}`} 
        />
      ))}
      <span className={`ml-1 text-sm font-medium ${size > 16 ? 'text-base' : 'text-sm'}`}>{rating.toFixed(1)}</span>
    </div>
  );
};

export default RatingStars;
