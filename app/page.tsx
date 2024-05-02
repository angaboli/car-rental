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

  /* useEffect( () => {
    async function testFetchAPI() {
      const MASTER_URL= process.env.WORDPRESS_API_URL || "";
      const response = await fetch(MASTER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `query CarLists {
            cars {
              nodes {
                id
                title(format: RENDERED)
                carACF {
                  carBrand
                  carCategory
                  carType
                  description
                  name
                  places
                  price
                  shortDescription
                  withDriver
                  image {
                    node {
                      sourceUrl
                    }
                  }
                }
              }
            }
          }`,
        }),
      });
      const data = await response.json();
      console.log('front reponse', data);
    }

    testFetchAPI();
  },[]) */

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
