import { request, gql } from "graphql-request";
import axios from 'axios';
import { CarsListResponse, Car, FormValues } from "@/types/";
//import { gql, useQuery } from '@apollo/client';

//const MASTER_URL= process.env.NEXT_PUBLIC_HYGRAPH_KEY || "";
const MASTER_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "";

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
    //console.error(json.errors);
    //console.error('error details', query, variables);
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
                databaseId
                sourceUrl
              }
            }
            gallery {
              img1 {
                node {
                  id
                  sourceUrl
                }
              }
              img2 {
                node {
                  id
                  sourceUrl
                }
              }
              img3 {
                node {
                  id
                  sourceUrl
                }
              }
              img4 {
                node {
                  id
                  sourceUrl
                }
              }
              img5 {
                node {
                  id
                  sourceUrl
                }
              }
            }
          }
        }
      }
    }
    `
  )
  return data?.cars;
}

export const createBooking = async (formValue: FormValues) => {
  const mutation = `
    mutation CreateBooking($input: CreateBookingInput!) {
      createBooking(input: $input) {
        booking {
          bookings {
            carId {
              edges {
                node {
                  id
                }
              }
            }
            pickuplocation
            pickUpDate
            pickUpTime
            dropOffLocation
            dropOffDate
            dropOffTime
            finalprice
            emailadress
            firstname
            lastname
            phonenumber
            withdriver
            outcapital
            whatsappnumber
          }
        }
      }
    }
  `;

  const variables = {
    input: {
      carId: formValue.carId,
      pickUplocation: formValue.pickUpLocation,
      pickUpDate: formValue.pickUpDate,
      pickUpTime: formValue.pickUpTime,
      dropOffLocation: formValue.dropOffLocation,
      dropOffDate: formValue.dropOffDate,
      dropOffTime: formValue.dropOffTime,
      finalprice: formValue.finalPrice,
      emailadress: formValue.emailAdress,
      firstname: formValue.firstName,
      lastname: formValue.lastName,
      phonenumber: formValue.phoneNumber,
      withdriver: formValue.withDriver,
      outcapital: formValue.outCapital,
      whatsappnumber: formValue.whatsAppNumber
    }
  };
  console.log("mutation : ", mutation, " \nvariables : ", variables)

  return await fetchAPI(mutation, { variables });
};

export async function GetAllBookings() {
  const queryBookings = await fetchAPI(
    `
    query Bookings {
        bookings {
          nodes {
            bookings {
              carId {
                edges {
                  node {
                    id
                  }
                }
              }
              pickUpDate
              pickUpTime
              dropOffDate
              dropOffTime
            }
          }
        }
    }
    `);
  return queryBookings.bookings;
}


export async function getCar(id: any): Promise<Car> {
  /* if (typeof id !== 'string') {
    console.log(typeof id)
    throw new Error("Invalid ID type");
  } */

  const queryCar = await fetchAPI(
    `
    query MyQuery {
      car(id: "${id}") {
        slug
        title(format: RENDERED)
        carACF {
          carBrand
          carCategory
          carType
          description
          gallery {
            img1 {
              node {
                sourceUrl
                guid
              }
            }
            img2 {
              node {
                guid
                sourceUrl
              }
            }
            img3 {
              node {
                guid
                sourceUrl
              }
            }
            img4 {
              node {
                guid
                sourceUrl
              }
            }
            img5 {
              node {
                guid
                sourceUrl
              }
            }
          }
          shortDescription
          price
          places
          withDriver
        }
        id
      }
    }`
  );
  return queryCar.car;
}


/* export async function getCar(id: string) {
  const queryCar = await fetchAPI(
    `
    query MyQuery {
      car(id: "${id}") {
        slug
        title(format: RENDERED)
        carACF {
          carBrand
          carCategory
          carType
          description
          gallery {
            img1 {
              node {
                sourceUrl
                guid
              }
            }
            img2 {
              node {
                guid
                sourceUrl
              }
            }
            img3 {
              node {
                guid
                sourceUrl
              }
            }
            img4 {
              node {
                guid
                sourceUrl
              }
            }
            img5 {
              node {
                guid
                sourceUrl
              }
            }
          }
          shortDescription
          price
          places
          withDriver
        }
        id
      }
    }`
  );
  return queryCar;
} */