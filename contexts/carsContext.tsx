import React, { createContext, ReactNode, useState, useEffect, useContext } from 'react';
import { getCarsList } from '@/services';

// Typage pour le contexte
interface CarsContextState {
  carsList: any[];
  setCars: React.Dispatch<React.SetStateAction<any[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultValue: CarsContextState = {
  carsList: [],
  setCars: () => {},
  loading: false,
  setLoading: () => {},
};

const CarsContext = createContext<CarsContextState>(defaultValue);

export const useCars = () => useContext(CarsContext);

export const CarsProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [carsList, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const result = await getCarsList();
        setCars(result.carLists);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
      setLoading(false);
    };

    fetchCars();
  }, []);

  
  const value = { carsList, setCars, loading, setLoading };

  return (
    <CarsContext.Provider value={value}>
      {children}
    </CarsContext.Provider>);
};
