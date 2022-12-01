import Head from "next/head";
import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/Home.module.css";
import Navbar from "../../../components/Navbar";

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
      <main className={styles.main}></main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
