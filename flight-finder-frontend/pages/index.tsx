import Head from "next/head";
import styles from "../styles/Home.module.css";

import Navbar from "../components/Navbar";
import SearchForm from "../components/SearchForm";
import DisplayOneWayResults from "../components/DisplayResults";
import { Context } from "../helpers/Context";
import React, { useState, useContext, useEffect } from "react";
import { type } from "os";

// type flight = {
//   flight_id: string;
//   departureDestination: string;
//   arrivalDestination: string;
//   itineraries: itinerary[];
// };

// type itinerary = {
//   arriveAt: Date;
//   avaliableSeats: number;
//   depatureAt: Date;
//   prices: price[];
// };

type price = {
  adult: number;
  child: number;
  currency: string;
};

type selectedFlight = {
  flight_id?: string;
  departureDate: Date;
  price: price;
  departureLocation: string;
  arrivalLocation: string;
  arrivalDate: Date;
  duration: number;
};
export default function Home() {
  const { setPassengerList } = useContext(Context);
  const [outbound, setOutbound] = useState<selectedFlight[]>([]);
  const [returnF, setReturnF] = useState<selectedFlight[]>([]);
  const [urlToFetch, setUrlToFetch] = useState<string>("");
  const [amountOfPassengers, setAmountOfPassengers] = useState<number>(0);
  useEffect(() => {
    setPassengerList([]);
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Flight Finder PGP</title>
        <meta
          name="description"
          content="A postgradute project for </SALT> by Pontus Alexander Liljekvist"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Navbar />
        <SearchForm
          setUrlFunc={setUrlToFetch}
          setAmountOfPassengersFunc={setAmountOfPassengers}
        />
        <br />
        <br />
        <DisplayOneWayResults
          urlToFetch={urlToFetch}
          outbound={outbound}
          setOutbound={setOutbound}
          returnF={returnF}
          setReturnF={setReturnF}
          amountOfPassengers={amountOfPassengers}
        />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
