import request, { gql } from "graphql-request";

const MASTER_URL="https://api-eu-west-2.hygraph.com/v2/clrtbrrae0lgu01uurnnsod74/master"


interface CarImage {
  url: string;
}

interface Car {
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

interface CarsListResponse {
  carLists: Car[];
}

export const getCarsList = async () : Promise<CarsListResponse> => {
  const query = gql`
    query CarLists {
      carLists {
        id
        carAvg
        carBrand
        carType
        createdAt
        image {
          url
        }
        name
        price
        places
        carCategory
        publishedAt
        updatedAt
      }
    }
  `
  const result = await request<CarsListResponse>(MASTER_URL, query)

  return result
}

export const createBooking = async (formValue: any) => {
  const mutationQuery = gql `
  mutation MyMutation {
    createBooking(
      data: {
        pickUpDate: "`+ formValue.pickUpDate + `",
        pickUpTime: "`+ formValue.pickUpTime + `",
        dropOffDate: "`+ formValue.dropOffDate + `",
        dropOffTime: "`+ formValue.dropOffTime + `",
        contactNumber: "`+ formValue.contactNumber + `",
        carId: {connect: {id: "`+ formValue.carId + `"}}
      }
    ) {
      id
    }
  }
  `
  const res = await request(MASTER_URL, mutationQuery);
  return res;
}