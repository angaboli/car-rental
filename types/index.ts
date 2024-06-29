
export interface CarImage {
  url: string;
}

/* export interface Car {
  id: string;
  carAvg: number;
  carBrand: string;
  carType: string;
  createdAt: string;
  image: CarImage;
  name: string;
  price: number;
  places: number;
  carCategory: string;
  withDriver: boolean;
  publishedAt: string;
  updatedAt: string;
} */

export interface CarsListResponse {
  carLists: Car[];
}

export interface IFormValues {
  pickUpLocation: string;
  dropOffLocation?: string;
  pickUpDate: string;
  dropOffDate: string;
  pickUpTime: string;
  dropOffTime: string;
  firstName: string;
  lastName: string;
  emailAdress: string;
  phoneNumber: string;
  whatsAppNumber?: string;
  finalPrice: number;
  age?: string;
  withDriver?: boolean;
  outCapital?: boolean;
  carId: string;
  carDBId: number;
  title?: string;
  returnAgency?: boolean;
}


export interface FormData {
  pickUpLocation?: string;
  dropOffLocation?: string;
  pickUpDate?: string;
  dropOffDate?: string;
  pickUpTime?: string;
  dropOffTime?: string;
  firstName?: string;
  lastName?: string;
  emailAdress?: string;
  phoneNumber?: string;
  whatsAppNumber?: string;
  finalPrice?: number;
  withDriver?: boolean;
  outCapital?: boolean;
  [key: string]: any;
}

export interface EmailParams {
  firstName: string;
  contactEmail: string;
  contactPhone: string;
  pickUpLocation: string;
  dropOffLocation: string;
  pickUpDate: string;
  pickUpTime: string;
  dropOffDate: string;
  dropOffTime: string;
  finalPrice: string;
}

export interface FormValidators {
  pickUpDate: (date: string) => string | null;
  pickUpTime: (pickUpTime: string, pickUpDate?: string) => string | null;
  dropOffDate: (dropOffDate: string, pickUpDate?: string) => string | null;
  dropOffTime: (dropOffTime: string, pickUpTime?: string, pickUpDate?: string, dropOffDate?: string) => string | null;
  firstName: (name: string) => string | null;
  lastName: (name: string) => string | null;
  emailAdress: (email: string) => string | null;
  phoneNumber: (phone: string, whatsAppNumber?: string) => string | null;
  //whatsAppNumber?: (phone: string, phoneNumber?: string) => string | null;
}

export interface FormErrors {
  pickUpLocation?: string;
  dropOffLocation?: string;
  pickUpDate?: string;
  pickUpTime?: string;
  dropOffDate?: string;
  dropOffTime?: string;
  firstName?: string;
  lastName?: string;
  emailAdress?: string;
  phoneNumber?: string;
  whatsAppNumber?: string;
  finalPrice?: string;
  withDriver?: boolean;
  outCapital?: boolean;
  [key: string]: string | boolean | undefined;
}

export interface EmailTemplateProps {
  firstName: string;
  lastName: string;
  emailAdress: string;
  pickUpLocation: string;
  dropOffLocation: string;
  pickUpDate: string;
  pickUpTime: string;
  dropOffDate: string;
  dropOffTime: string;
  phoneNumber: number;
  whatsAppNumber: number;
  age: number;
  withDriver: boolean;
  outCapital: boolean;
  carTitle: string;
  carDBId: number;
  finalPrice: number;
}

export interface AvailabilityState {
  loading: boolean;
  error: Error | null;
  isAvailable: boolean;
}

export interface DateParams {
  pickUpDate: string;
  dropOffDate: string;
}

export interface TimeParams extends DateParams {
  pickUpTime: string;
  dropOffTime: string;
}

export interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ValidationParams {
  value: string;
  fieldName: string;
}

export interface ImageNode {
  node: {
    id: number;
    sourceUrl: string;
  } | null;
}

export interface Gallery {
  img1: ImageNode | null;
  img2: ImageNode | null;
  img3: ImageNode | null;
  img4: ImageNode | null;
  img5: ImageNode | null;
  [key: string]: ImageNode | null;
}

export interface Car {
  id: string;
  title: string;
  slug: string;
  databaseId: number;
  carACF: {
    carBrand: string;
    carCategory: string;
    carType: string;
    description: string;
    places: number;
    price: number;
    shortDescription: string;
    withDriver: boolean;
    gallery: {
      img1: { node: { sourceUrl: string } } | null;
      img2: { node: { sourceUrl: string } } | null;
      img3: { node: { sourceUrl: string } } | null;
      img4: { node: { sourceUrl: string } } | null;
      img5: { node: { sourceUrl: string } } | null;
    };
    image: { node: { sourceUrl: string } };
  };
}

interface CarQueryData {
  car: Car;
}

export type CarType = CarQueryData;

/* export interface FormValidators {
  pickUpDate: (date: string) => string | null;
  pickUpTime: (pickUpTime: string, pickUpDate?: string) => string | null;
  dropOffDate: (dropOffDate: string, pickUpDate?: string) => string | null;
  dropOffTime: (dropOffTime: string, pickUpTime?: string, pickUpDate?: string, dropOffDate?: string) => string | null;
  firstName: (name: string) => string | null;
  lastName: (name: string) => string | null;
  emailAdress: (email: string) => string | null;
  phoneNumber: (phone: string, whatsAppNumber?: string) => string | null;
} */