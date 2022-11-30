import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import React, { useState } from "react";
import PassengerForm from "../../components/PassengerForm";

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
          <h1>Flight 1 {flight_id1}</h1>
          <h1>Flight 2 {flight_id2}</h1>
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
          <h1>Flight 1 {flight_id1}</h1>
          <button onClick={() => console.log(passengerForms.length)}>
            Check passengerForms Length
          </button>
          <div>
            {passengerForms.map((_) => (
              <p>hello</p>
            ))}
          </div>
        </main>

        <footer className={styles.footer}></footer>
      </div>
    );
  }
}
