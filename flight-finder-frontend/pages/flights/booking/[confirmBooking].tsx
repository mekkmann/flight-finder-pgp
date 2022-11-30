import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import Navbar from "../../../components/Navbar";
import React, { useState } from "react";
import PassengerForm from "../../../components/PassengerForm";

export default function Home() {
  const router = useRouter();
  const {
    flight_id1,
    departureDate1,
    price1,
    departureLocation1,
    arrivalLocation1,
    flight_id2,
    departureDate2,
    price2,
    departureLocation2,
    arrivalLocation2,
    amountOfPassengers,
    totalPrice,
  } = router.query;
  const [urlToPost, setUrlToPost] = useState<string>("");

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
          <h2>Flight 1 {flight_id1}</h2>
          <h2>Flight 2 {flight_id2}</h2>
          <div>
            {passengerForms.map((_) => (
              <PassengerForm />
            ))}
          </div>
        </main>

        <footer className={styles.footer}></footer>
      </div>
    );
  }
  if (flight_id1) {
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
            <li>Price for Adults: {price1} SEK</li>
            <li>Price for Children: {"placeholder"} SEK</li>
            <li>Flight ID:{flight_id1}</li>
          </ul>
          <br />
          <div>
            {passengerForms.map((_) => (
              <PassengerForm />
            ))}
          </div>
        </main>

        <footer className={styles.footer}></footer>
      </div>
    );
  }
}
