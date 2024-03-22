import { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Audiowide } from 'next/font/google'
import Form from '@/components/form';
import { useRouter } from 'next/router';
import { getCarsList } from '@/services';
import CryptoJS from 'crypto-js';
import SkeletonPage from '@/components/SkeletonPage';
import CarDetails from '@/components/carDetails';

interface Car {
  carAvg?: number;
  carBrand: string;
  carCategory: string;
  carType: string;
  createdAt?: string;
  description?: string | null;
  gallery?: Array<{[key: string]: any}>;
  id: string;
  image: { url: string };
  name: string;
  places?: number;
  price: number;
  publishedAt?: string;
  shortDescription?: string;
  updatedAt?: string;
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
        const result = await getCarsList();
        const decryptedId = carId ? decryptID(Array.isArray(carId) ? carId[0] : carId) : null;
        const foundCar = result.carLists.find((car: any) => car.id === decryptedId);
        (foundCar) && setCar(foundCar);
        //else setError('La voiture n\'apas été trouvé');
      } catch (error) {
        console.error('Error fetching cars:', error);
        setError('Failed to fetch cars');
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
      <Header />
      <main className="scroll-smooth bg-light-gray">
        <div id="reservez" className=" bg-gradient-to-r from-gray-200 to-slate-300">
          <div className="wrapper  min-h-[200px]">
            <h1 className={`${audiowide.className } head_text xs:w-full sm:w-1/2 mx-auto mb-10 pt-20 text-center uppercase`}>
              Réservation de la&nbsp;
              <span className="text-primary-black">{car?.name}&nbsp;</span>
            </h1>
          </div>
        </div>
        <div>
          {
            loading && !car ?
              <SkeletonPage /> :
              <div className='md:max-w-[1366px] px-8 mx-auto pb-10'>
                <div className="flex flex-col lg:flex-row gap-10 mx-auto">
                  <Form className="w-full lg:w-3/5" car={car} />
                  <div className="w-full lg:w-2/5 shadow-md rounded-3xl p-5 my-3">
                    <CarDetails car={car} />
                  </div>
                </div>
              </div>
          }
          {/* Affichez ici les détails de la réservation ou un formulaire */}
        </div>
      </main>
      <Footer />
    </>
  );
}
