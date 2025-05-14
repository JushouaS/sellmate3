import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Order {
  id: string | number;
  orderNumber: string;
  date: string;
  status: string;
  total: number;
  items: number;
  productName?: string;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const defaultOrders: Order[] = [{
  id: '1',
  orderNumber: 'ORDER-12345',
  date: '2023-10-15',
  status: 'delivered',
  total: 8399.44,
  items: 2,
  productName: '',
}, {
  id: '2',
  orderNumber: 'ORDER-12346',
  date: '2023-11-02',
  status: 'pending',
  total: 4479.44,
  items: 1,
  productName: '',
}, {
  id: '3',
  orderNumber: 'ORDER-12347',
  date: '2023-11-20',
  status: 'pending',
  total: 16799.44,
  items: 3,
  productName: '',
}];

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const stored = localStorage.getItem('orders');
    return stored ? JSON.parse(stored) : defaultOrders;
  });

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrderContext must be used within an OrderProvider');
  }
  return context;
}; 