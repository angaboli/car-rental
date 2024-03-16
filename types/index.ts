
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
  publishedAt: string;
  updatedAt: string;
}

export interface CarsListResponse {
  carLists: Car[];
}