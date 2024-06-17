import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Audiowide } from 'next/font/google'
import Form from '@/components/form';
import { useRouter } from 'next/router';
import { getCarsList, getCar } from '@/services';
import CryptoJS from 'crypto-js';
import SkeletonPage from '@/components/SkeletonPage';
import CarDetails from '@/components/carDetails';
import type { Metadata } from 'next';
import { Car } from '@/types';
import { FormProvider } from '@/contexts/formContext';

export const metadata: Metadata = {
  title: 'COCOGO - Réservation',
  description: 'Car rental App developped by D3',
}

const audiowide = Audiowide({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function CarReservation() {
  const router = useRouter();
  const { carId } = router.query;
  const secretKey = process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY || "";
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCarsList = async () => {
      try {
        const result = await getCar(carId);
        const foundCar = result;
        if (foundCar) setCar(foundCar);
      } catch (error) {
        //console.error('Error fetching car:', error);
        setError('Failed to fetch car');
      } finally {
        setLoading(false);
      }
    };

    fetchCarsList();
  }, [carId]);


  const decryptID = (encryptedId: string) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedId, secretKey);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (e) {
      console.error('Decryption error:', e);
      return null;
    }
  };

  //if (loading) return ;
  //if (error) return <p>Error: {error}</p>;

  return (
    <>
      <FormProvider>
        <Head>
          <title>{car ? `COCOGO - Réservation de la voiture ${car?.title}` : "COCOGO - Réservation"}</title>
          <meta name="description" content={car?.carACF?.shortDescription} />
        </Head>
        <Header />
        <main className="scroll-smooth bg-light-gray">
          <div id="reservez" className=" bg-gradient-to-r from-gray-200 to-slate-300">
            <div className="wrapper  min-h-[200px]">
              <h1 className={`${audiowide.className} head_text xs:w-full sm:w-1/2 mx-auto mb-10 pt-20 text-center uppercase`}>
                Réservation de la&nbsp;
                <span className="text-primary-black">{car?.title}&nbsp;</span>
              </h1>
            </div>
          </div>
          <div>
            {
              loading && !car ? (
                <SkeletonPage />
              ) :
                car && (
                  <div className='w-11/12 px-8 mx-auto pb-10'>
                    <div className="flex flex-col lg:flex-row gap-10 mx-auto">
                      <FormProvider>
                        <Form className="w-full lg:w-7/12" car={car} loading={loading} />
                      </FormProvider>
                      <div className="w-full lg:w-5/12 shadow-md rounded-3xl p-5 my-3">
                        <CarDetails car={car} />
                      </div>
                    </div>
                  </div>
                )
            }
          </div>
        </main>
        <Footer />
      </FormProvider>
    </>
  );
}
