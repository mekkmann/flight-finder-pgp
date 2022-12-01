import Head from "next/head";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/Home.module.css";
import Navbar from "../../../components/Navbar";
import { Context } from "../../../helpers/Context";
import PassengerCard from "../../../components/PassengerCard";
import LastAlert from "../../../components/LastAlert";

export default function Home() {
  const { passengerList, setPassengerList } = useContext(Context);
  const [modal, setModal] = useState<boolean>(false);
  const [lastCheck, setLastCheck] = useState<boolean>(false);
  const [postSuccess, setPostSuccess] = useState<boolean>(false);

  const postUrl = "https://localhost:7283/flights/book/";

  useEffect(() => {
    if (lastCheck) {
      console.log("posting to db");
    }
  }, [lastCheck]);

  const router = useRouter();
  const {
    flight_id1,
    departureDate1,
    departureLocation1,
    arrivalDate1,
    arrivalLocation1,
    flight_id2,
    departureDate2,
    departureLocation2,
    arrivalLocation2,
    arrivalDate2,
    amountOfPassengers,
    totalPrice,
  } = router.query;
  const handleModal = () => {
    setModal(!modal);
  };

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
          <h1>Final Confirmation for </h1>
          <h1>Booking: One-Way </h1>
          <LastAlert
            setLastCheck={setLastCheck}
            lastCheck={lastCheck}
            openModal={modal}
            handleModal={handleModal}
            postSuccess={postSuccess}
          />
          <br />
          <hr style={{ width: "70vw" }} />
          <br />
          <ul>
            <li>
              Departure from: {departureLocation1 + ", "}
              {departureDate1?.toString().split("T")[0]} at{" "}
              {departureDate1?.toString().split("T")[1]}
            </li>
            <li>
              Arrival in:{" "}
              {arrivalLocation1 +
                ", " +
                arrivalDate1?.toString().split("T")[0] +
                " at " +
                arrivalDate1?.toString().split("T")[1]}
            </li>
            <li>Passengers: {amountOfPassengers}</li>
            <li>Flight ID: {flight_id1}</li>
          </ul>
          <br />
          <p>Total: {totalPrice} SEK</p>
          <br />
          <hr style={{ width: "70vw" }} />
          <br />
          {passengerList.map((passenger) => (
            <PassengerCard passenger={passenger} />
          ))}

          <button
            onClick={handleModal}
            style={{ width: "20vw", marginBottom: "1rem" }}
            disabled={lastCheck}
          >
            Confirm Booking
          </button>
        </main>

        <footer className={styles.footer}></footer>
      </div>
    );
  }
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
          <h1>Final Confirmation for </h1>
          <h1>Booking: Round Trip </h1>
          <LastAlert
            setLastCheck={setLastCheck}
            lastCheck={lastCheck}
            openModal={modal}
            handleModal={handleModal}
            postSuccess={postSuccess}
          />
          <br />
          <hr style={{ width: "70vw" }} />
          <br />
          <ul>
            <li>
              Departure from: {departureLocation1 + ", "}
              {departureDate1?.toString().split("T")[0]} at{" "}
              {departureDate1?.toString().split("T")[1]}
            </li>
            <li>
              Arrival in:{" "}
              {arrivalLocation1 +
                ", " +
                arrivalDate1?.toString().split("T")[0] +
                " at " +
                arrivalDate1?.toString().split("T")[1]}
            </li>
            <li>Passengers: {amountOfPassengers}</li>
            <li>Flight ID: {flight_id1}</li>
          </ul>
          <br />
          <p>Total: {totalPrice} SEK</p>
          <br />
          <hr style={{ width: "70vw" }} />
          <br />
          {passengerList.map((passenger) => (
            <PassengerCard passenger={passenger} />
          ))}

          <button
            onClick={handleModal}
            style={{ width: "20vw", marginBottom: "1rem" }}
            disabled={lastCheck}
          >
            Confirm Booking
          </button>
        </main>

        <footer className={styles.footer}></footer>
      </div>
    );
  }
}
