'use client';
import React, { useState, useEffect, lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/hero';
import CarsFiltersOption from '@/components/carsFiltersOption';
//import CarsList from '@/components/carsList';
import Processus from '@/components/processus';
//import { getCarsList } from '@/services';
import { CarsProvider, useCars } from '@/contexts/carsContext';
import { FormProvider } from '@/contexts/formContext';
import { CarsListResponse } from '@/types'
import Skeleton from '@/components/skeleton';
const DynamicContactWithNoSSR = dynamic(() => import('../components/contact'), { ssr: false });
const LazyCarList = lazy(() => import('@/components/carsList'));

export default function Home() {
  const [carsList, setCarsList] = useState<any[]>([]);
  const { loading } = useCars();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading])

  console.log("page isLoading: ", isLoading);


  return (
    <CarsProvider>
      <main className="scroll-smooth bg-light-gray">
        <FormProvider>
          <Hero />
          <Suspense fallback={<Skeleton />}>
            <LazyCarList />
          </Suspense>
        </FormProvider>
        <Processus />
        <DynamicContactWithNoSSR />
      </main>
    </CarsProvider>
  );
}
