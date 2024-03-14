"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Hero from '@/components/hero'
import CarsFiltersOption from '@/components/carsFiltersOption'
import CarsList from '@/components/carsList'
import Skeleton from '@/components/skeleton'
import Processus from '@/components/processus'
import { getCarsList } from '@/services';
const DynamicContactWithNoSSR = dynamic(
  () => import('../components/contact'),
  { ssr: false }
);

export default function Home() {
  const [originalCarsList, setOriginalCarsList] = useState<any>([]);
  const [carsList, setCarsList] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<number>(1); // 1 pour ascendant, -1 pour descendant
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carList();
  }, []);

  const carList = async () => {
    setLoading(true);
    try {
      const result = await getCarsList();
      setOriginalCarsList(result.carLists);
      setCarsList(result.carLists);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
    setLoading(false);
  };

  const applyFilters = () => {
    let filteredList = [...originalCarsList];

    if (selectedCategory) {
      filteredList = filteredList.filter(item => item.carCategory === selectedCategory);
    }

    if (selectedType) {
      filteredList = filteredList.filter(item => item.carType === selectedType);
    }

    filteredList.sort((a, b) => selectedOrder === -1 ? b.price - a.price : a.price - b.price);

    setCarsList(filteredList);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedCategory, selectedType, selectedOrder]);

  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedType(null);
    setSelectedOrder(1);
    applyFilters();
  };

  return (
    <main className="scroll-smooth bg-light-gray">
      <Hero carsList={originalCarsList} />
      <CarsFiltersOption
        carsList={originalCarsList}
        setCat={(value: string) => setSelectedCategory(value)}
        setType={(value: string) => setSelectedType(value)}
        orderCarList={(value: number) => setSelectedOrder(value)}
        resetFilters={resetFilters}
      />
      {
        loading ?
          <Skeleton /> :
            carsList.length > 0 ?
              <CarsList carsList={carsList} /> :
              <div className="w-1/2 h-50 mx-auto p-10">
                <div className="flex gap-2 justify-center shadow bg-white text-center text-orange p-5 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-orange shrink-0 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p>Aucun véhicule ne correspond aux critères sélectionnés.</p>
                </div>
              </div>
      }
      <Processus />
      <DynamicContactWithNoSSR />
    </main>
  )
}
