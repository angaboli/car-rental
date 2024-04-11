
export interface CarImage {
  url: string;
}

export interface Car {
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
}

export interface CarsListResponse {
  carLists: Car[];
}

export interface FormValues {
  pickUpLocation: string;
  dropOffLocation: string;
  pickUpDate: string;
  dropOffDate: string;
  pickUpTime: string;
  dropOffTime: string;
  firstName: string;
  lastName: string;
  emailAdress?: string;
  phoneNumber?: string;
  whatsAppNumber?: string;
  finalPrice?: string;
  withDriver?: boolean;
  outCapital?: boolean;
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
  dropOffDate: (dropOffDate: string, pickUpDate: string) => string | null;
  dropOffTime: (dropOffTime: string, pickUpTime: string, pickUpDate: string, dropOffDate: string) => string | null;
  firstName: (name: string) => string | null;
  lastName: (name: string) => string | null;
  emailAdress: (email: string) => string | null;
  phoneNumber: (phone: string, whatsAppNumber?: string) => string | null;
  whatsAppNumber: (phone: string, phoneNumber?: string) => string | null;
}

export interface FormValues {
  pickUpLocation: string;
  dropOffLocation: string;
  pickUpDate: string;
  dropOffDate: string;
  pickUpTime: string;
  dropOffTime: string;
  firstName: string;
  lastName: string;
  emailAdress: string | null;
  phoneNumber: string | null;
  whatsAppNumber: string | null;
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