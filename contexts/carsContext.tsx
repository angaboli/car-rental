// contexts/CarsContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Car } from '@/types';

interface CarImage {
  url: string;
}

type CarsContextType = {
  cars: Car[];
  setCars: (cars: Car[]) => void;
};

const CarsContext = createContext<CarsContextType | undefined>(undefined);

export const CarsProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [cars, setCars] = useState<Car[]>([]);

  return (
    <CarsContext.Provider value={{ cars, setCars }}>
      {children}
    </CarsContext.Provider>
  );
};

export const useCars = () => {
  const context = useContext(CarsContext);
  if (context === undefined) {
    throw new Error('useCars must be used within a CarsProvider');
  }
  return context;
};
