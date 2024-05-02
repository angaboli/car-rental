import { request, gql } from "graphql-request";
import axios from 'axios';
import {CarsListResponse } from "@/types/";
//import { gql, useQuery } from '@apollo/client';

//const MASTER_URL= process.env.NEXT_PUBLIC_HYGRAPH_KEY || "";
const MASTER_URL= process.env.WORDPRESS_API_URL || "https://cocogo.mizi.fr/graphql";

/* async function fetchAPI(query = "", { variables }: Record<string, any> = {}) {
  const headers = { "Content-Type": "application/json", "Accept": "application/json" };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      "Authorization"
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  const res = await fetch(MASTER_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const contentType = res.headers.get("content-type");
  console.log(contentType)
  console.log(res)
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Le serveur n'a pas renvoyé du JSON");
  }
  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
} */

async function fetchAPI(query = "", { variables }: Record<string, any> = {}) {

  const headers = { 'Content-Type': 'application/json' };

  // build out the fetch() call using the API_URL
  // environment variable pulled in at the start
  // Note the merging of the query and variables
  const res = await fetch(MASTER_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables })
  });

  // error handling work
  const json = await res.json();
  if (json.errors) {
    console.log(json.errors);
    console.log('error details', query, variables);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

export async function getCarsList() {
  const data = await fetchAPI(
  `
    query CarLists {
      cars {
        nodes {
          id
          title(format: RENDERED)
          carACF {
            carBrand
            carCategory
            carType
            description
            name
            places
            price
            shortDescription
            withDriver
            image {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
    `
  )
  //const result = await request<CarsListResponse>(MASTER_URL, query);
  //return result;
  return data?.cars;
}

/* export const getCarsList = async () : Promise<CarsListResponse> => {
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
} */


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
          carId {
            id
          }
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
/*
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
 */