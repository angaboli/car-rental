import { request, gql } from "graphql-request";
//import { gql, useQuery } from '@apollo/client';

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
        shortDescription
        description{
          html
          text
        }
        price
        places
        carCategory
        gallery {
          url
        }
        publishedAt
        updatedAt
      }
    }
  `
  const result = await request<CarsListResponse>(MASTER_URL, query)

  return result
}

type Booking = {
  id: string;
  carId: string;
  pickUpDate: string;
  pickUpTime: string;
  dropOffTime: string;
  dropOffDate: string;
  contactNumber: string;
};

export const createBooking = async (formValue: Booking) => {
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

export async function checkCarAvailability($pickUpDate: string, $dropOffDate: string) {
  try {
    const variables = {
      where: {
        OR: [
          { AND: [{ pickUpDate_lte: $pickUpDate }, { dropOffDate_gte: $pickUpDate }] },
          { AND: [{ pickUpDate_lte: $dropOffDate }, { dropOffDate_gte: $dropOffDate }] },
          { AND: [{ pickUpDate_gte: $pickUpDate }, { dropOffDate_lte: $dropOffDate }] }
        ],
      },
      skip: 0,
    };

    const query = gql`
      query MyBookings {
        bookings(where: {carId: {}}) {
          id
          pickUpDate
          pickUpTime
          dropOffTime
          dropOffDate
        }
      }`;

    const data = await request<any>(MASTER_URL, query, variables);
    return {
      loading: false,
      error: null,
      isAvailable: true, //data.page.aggregate.count === 0, // Supposons que `data.page.aggregate.count` donne le nombre de réservations trouvées
    };
  } catch (error) {
    return {
      loading: false,
      error: error instanceof Error ? error : new Error("Une erreur inconnue est survenue"),
      isAvailable: false,
    };
  }
}
