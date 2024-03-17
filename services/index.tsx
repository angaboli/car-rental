import { request, gql } from "graphql-request";
import {CarsListResponse } from "@/types/";
//import { gql, useQuery } from '@apollo/client';

const MASTER_URL="https://api-eu-west-2.hygraph.com/v2/clrtbrrae0lgu01uurnnsod74/master"


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
        withDriver
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
        pickUpLocation: "`+ formValue.pickUpLocation + `",
        pickUpDate: "`+ formValue.pickUpDate + `",
        pickUpTime: "`+ formValue.pickUpTime + `",
        dropOffLocation: "`+ formValue.dropOffLocation + `",
        dropOffDate: "`+ formValue.dropOffDate + `",
        dropOffTime: "`+ formValue.dropOffTime + `",
        finalPrice: "`+ formValue.finalPrice + `",
        carId: {connect: {id: "`+ formValue.carId + `"}}
        emailAdress: "`+ formValue.emailAdress + `",
        firstName: "`+ formValue.firstName + `",
        lastName: "`+ formValue.lastName + `",
        phoneNumber: "`+ formValue.phoneNumber + `",
        withDriver: "`+ formValue.withDriver + `",
        outCapital: "`+ formValue.outCapital + `",
        whatsAppNumber: "`+ formValue.whatsAppNumber + `",
      }
    ) {
      id
    }
  }
  `
  const res = await request(MASTER_URL, mutationQuery);
  return res;
}


export async function GetAllBookings() {
  try {
    const query = gql`
      query MyBookings {
        bookings {
          id
          pickUpDate
          pickUpTime
          dropOffTime
          dropOffDate
        }
      }`;
      const data = await request<any>(MASTER_URL, query);
    return {
      loading: false,
      error: null,
      data: data,
    };
  } catch(error){
    return {
      loading: false,
      error: error instanceof Error ? error : new Error("Une erreur inconnue est survenue"),
      data: {},
    };
  }
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
