'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/hero';
import CarsFiltersOption from '@/components/carsFiltersOption';
import CarsList from '@/components/carsList';
import Skeleton from '@/components/skeleton';
import Processus from '@/components/processus';
//import { getCarsList } from '@/services';
import { CarsProvider, useCars } from '@/contexts/carsContext';
import { CarsListResponse } from '@/types'

const DynamicContactWithNoSSR = dynamic(() => import('../components/contact'), { ssr: false });

export default function Home() {
  const [carsList, setCarsList] = useState<any[]>([]);
  const {loading} = useCars();

  return (
    <CarsProvider>
      <main className="scroll-smooth bg-light-gray">
        <Hero />
        {/* <CarsFiltersOption /> */}
        {loading ? <Skeleton /> : <CarsList />}
        <Processus />
        <DynamicContactWithNoSSR />
      </main>
    </CarsProvider>
  );
}
