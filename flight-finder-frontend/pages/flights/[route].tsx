import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import React, { useEffect, useState } from "react";
import PassengerForm from "../../components/PassengerForm";

type passenger = {
  firstName: string;
  lastName: string;
  dob: Date;
  email: string;
  phone: number;
};

export default function Home() {
  const router = useRouter();
  const {
    flight_id1,
    departureDate1,
    priceAdult1,
    priceChild1,
    departureLocation1,
    arrivalLocation1,
    flight_id2,
    departureDate2,
    priceAdult2,
    priceChild2,
    departureLocation2,
    arrivalLocation2,
    amountOfPassengers,
  } = router.query;
  const [urlToPost, setUrlToPost] = useState<string>("");
  const [numOfAdults, setNumOfAdults] = useState<number>(0);
  const [numOfChildren, setNumOfChildren] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [passengerList, setPassengerList] = useState<passenger[]>([]);
  const getTotalPrice = () => {
    let childTotal;
    let adultTotal;
    if (flight_id1 && flight_id2) {
      childTotal = numOfChildren * (Number(priceChild1) + Number(priceChild2));
      adultTotal = numOfAdults * (Number(priceAdult1) + Number(priceAdult2));
      setTotalPrice(childTotal + adultTotal);
    }
    if (flight_id1 && !flight_id2) {
      childTotal = numOfChildren * Number(priceChild1);
      adultTotal = numOfAdults * Number(priceAdult1);
      setTotalPrice(childTotal + adultTotal);
    }
  };
  const increaseChildren = () => {
    setNumOfChildren(numOfChildren + 1);
  };
  const increaseAdults = () => {
    setNumOfAdults(numOfAdults + 1);
  };

  useEffect(() => {
    getTotalPrice();
  }, [numOfAdults, numOfChildren]);

  const passengerForms = [...Array(Number(amountOfPassengers))];
  if (flight_id1 && flight_id2) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Flight Finder PGP</title>
          <meta
            name="description"
            content="A postgraduate project for </SALT> by Pontus Alexander Liljekvist"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar />
        <main className={styles.main}>
          <h1>Booking: Round Trip</h1>
          <hr style={{ width: "70vw" }} />
          <br />
          <div
            className="booking"
            style={{
              width: "70vw",
              display: "flex",
              paddingBottom: "1rem",
              justifyContent: "space-between",
            }}
          >
            <div
              className="booking_Flights"
              style={{
                border: "2px solid black",
                width: "33vw",
                padding: "1rem",
              }}
            >
              <h3>Outbound</h3>
              <ul style={{ listStyle: "none" }}>
                <li>
                  Departure: {departureDate1?.toString().split("T")[0]} at{" "}
                  {departureDate1?.toString().split("T")[1]}
                </li>
                <li>Outbound from: {departureLocation1}</li>
                <li>Arrival in: {arrivalLocation1}</li>
                <li>Passengers: {amountOfPassengers}</li>
                <li>Price for Adults: {priceAdult1} SEK</li>
                <li>Price for Children: {priceChild1} SEK</li>
                <li>Flight ID:{flight_id1}</li>
              </ul>
              <br />
            </div>
            <div
              className="booking_Flights"
              style={{
                border: "2px solid black",
                width: "33vw",
                padding: "1rem",
              }}
            >
              <h3>Return</h3>
              <ul style={{ listStyle: "none" }}>
                <li>
                  Departure: {departureDate2?.toString().split("T")[0]} at{" "}
                  {departureDate2?.toString().split("T")[1]}
                </li>
                <li>Outbound from: {departureLocation2}</li>
                <li>Arrival in: {arrivalLocation2}</li>
                <li>Passengers: {amountOfPassengers}</li>
                <li>Price for Adults: {priceAdult2} SEK</li>
                <li>Price for Children: {priceChild2} SEK</li>
                <li>Flight ID:{flight_id2}</li>
              </ul>
              <br />
            </div>
          </div>
          <div>
            {passengerForms.map((_) => (
              <PassengerForm
                increaseChildren={increaseChildren}
                increaseAdults={increaseAdults}
              />
            ))}
          </div>
          <h4>Adults: {numOfAdults}</h4>
          <h4>Children: {numOfChildren}</h4>
          <h4>Total: {totalPrice} SEK </h4>
          <button>Confirm Booking</button>
        </main>

        <footer className={styles.footer}></footer>
      </div>
    );
  }
  if (flight_id1 && !flight_id2) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Flight Finder PGP</title>
          <meta
            name="description"
            content="A postgraduate project for </SALT> by Pontus Alexander Liljekvist"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <main className={styles.main}>
          <br />
          <h1>Booking: One Way</h1>
          <hr style={{ width: "70vw" }} />
          <br />
          <ul>
            <li>
              Departure: {departureDate1?.toString().split("T")[0]} at{" "}
              {departureDate1?.toString().split("T")[1]}
            </li>
            <li>Outbound from: {departureLocation1}</li>
            <li>Arrival in: {arrivalLocation1}</li>
            <li>Passengers: {amountOfPassengers}</li>
            <li>Price for Adults: {priceAdult1} SEK</li>
            <li>Price for Children: {priceChild1} SEK</li>
            <li>Flight ID:{flight_id1}</li>
          </ul>
          <br />
          <div>
            {passengerForms.map((_) => (
              <PassengerForm
                increaseChildren={increaseChildren}
                increaseAdults={increaseAdults}
              />
            ))}
          </div>
          <h4>Adults: {numOfAdults}</h4>
          <h4>Children: {numOfChildren}</h4>
          <h4>Total: {totalPrice} SEK </h4>
          <button>Confirm Booking</button>
        </main>

        <footer className={styles.footer}></footer>
      </div>
    );
  }
}
