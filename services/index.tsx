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

/* const GET_RESERVATIONS = gql`
  query GetReservations($carId: ID!, $startDate: DateTime!, $endDate: DateTime!) {
    bookings(
      where: {
        car: { id: $carId }
        AND: [
          { startDate_lte: $dropOffDate }
          { endDate_gte: $pickUpDate }
        ]
      }
    ) {
      id
      startDate
      endDate
    }
  }
`;

export async function checkCarAvailability(carId: string, startDate: string, endDate: string) {
  try {
      const variables = { carId, startDate, endDate };
      const data = await request<any>(MASTER_URL, GET_RESERVATIONS, variables);
      return {
          loading: false,
          error: null,
          isAvailable: data.reservations.length === 0,
      };
  } catch (error) {
      return {
          loading: false,
          error,
          isAvailable: false,
      };
  }
} */

export async function checkCarAvailability(carId: string, startDate: string, endDate: string) {
  try {
    const variables = {
      where: {
        carId: { equals: carId },
        AND: [
          { startDate: { lte: endDate } },
          { endDate: { gte: startDate } },
        ],
      },
      stage: 'PUBLISHED', // Assurez-vous que cette variable correspond à ce que votre API attend
      first: 10, // Ajustez selon le besoin
      skip: 0,
    };

    const query = `query GetReservations($first: Int, $skip: Int, $stage: Stage!, $where: BookingWhereInput, $orderBy: BookingOrderByInput) {
      page: bookingsConnection(
        first: $first
        skip: $skip
        stage: $stage
        where: $where
        orderBy: $orderBy
      ) {
        edges {
          node {
            id
          }
        }
        aggregate {
          count
        }
      }
    }`;

    const data = await request<any>(MASTER_URL, query, variables);
    return {
      loading: false,
      error: null,
      isAvailable: data.page.aggregate.count === 0, // Supposons que `data.page.aggregate.count` donne le nombre de réservations trouvées
    };
  } catch (error) {
    return {
      loading: false,
      error,
      isAvailable: false,
    };
  }
}
