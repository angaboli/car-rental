import { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Form from '@/components/form';
import { useRouter } from 'next/router';
import { getCarsList } from '@/services';
import CryptoJS from 'crypto-js';

interface Car {
  carAvg: number;
  carBrand: string;
  carCategory: string;
  carType: string;
  createdAt: string;
  description?: string | null;
  gallery?: Array<{[key: string]: any}>;
  id: string;
  image: { url: string };
  name: string;
  places: number;
  price: number;
  publishedAt: string;
  shortDescription?: string;
  updatedAt: string;
}



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
        console.log(result.carLists);
        console.log(decryptedId);
        //console.log(foundCar)
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
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Header />
      <main className="scroll-smooth bg-light-gray">
        <div>
          {
            loading && !car ?
              <p>Loading...</p> :
              <div>
                <h1>Réservation pour {car?.name }</h1>
                <Form car={car} />
              </div>
          }
          {/* Affichez ici les détails de la réservation ou un formulaire */}
        </div>
      </main>
      <Footer />
    </>
  );
}
