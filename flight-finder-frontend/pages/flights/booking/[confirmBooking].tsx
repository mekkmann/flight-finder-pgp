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
  const [waiting, setWaiting] = useState<boolean>(true);
  const [confirmationEmail, setConfirmationEmail] = useState<string>("");

  const router = useRouter();
  let {
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
  useEffect(() => {
    // if (flight_id1 == undefined) flight_id1 = "";
    // if (departureDate1 == undefined) departureDate1 = "";
    // // if (flight_id2 == undefined) flight_id2 = "";
    // if (departureDate2 == undefined) departureDate2 = "";
    // if (amountOfPassengers == undefined) amountOfPassengers = "";
    if (lastCheck) {
      console.log("posting to db");
      if (flight_id1 && !flight_id2) bookFlight(postUrl1);
      if (flight_id1 && flight_id2) bookFlight(postUrl2);
    }
  }, [lastCheck]);

  const postUrl1 =
    "https://localhost:7283/flights/book?" +
    "flightId1=" +
    flight_id1 +
    "&departureDate1=" +
    departureDate1 +
    "&recipientEmail=" +
    "alex.p.liljekvist@gmail.com" +
    "&amountOfPassengers=" +
    amountOfPassengers;

  const postUrl2 =
    "https://localhost:7283/flights/book?" +
    "flightId1=" +
    flight_id1 +
    "&departureDate1=" +
    departureDate1 +
    "&flightId2=" +
    flight_id2 +
    "&departureDate2=" +
    departureDate2 +
    "&recipientEmail=" +
    "alex.p.liljekvist@gmail.com" +
    "&amountOfPassengers=" +
    amountOfPassengers;
  // string? flightId1,
  // DateTime? departureDate1,
  // string? flightId2,
  // DateTime? departureDate2,
  // string? recipientEmail,
  // int amountOfPassengers = 1
  const bookFlight = (url: string) => {
    fetch(url, {
      method: "POST",
      mode: "cors",
      // body: JSON.stringify({
      //   flightId1: flight_id1,
      //   departureDate1: departureDate1,
      //   flightId2: flight_id2,
      //   departureDate2: departureDate2,
      //   recipientEmail: confirmationEmail,
      //   amountOfPassengers: amountOfPassengers,
      // }),
    })
      .then((res) => {
        setWaiting(true);
        if (res.status == 200) {
          setPostSuccess(true);
          setWaiting(false);
        }
      })
      .catch((e) => console.log(e.message));
  };

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
            waiting={waiting}
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
            waiting={waiting}
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
          <ul>
            <li>
              Departure from: {departureLocation2 + ", "}
              {departureDate2?.toString().split("T")[0]} at{" "}
              {departureDate2?.toString().split("T")[1]}
            </li>
            <li>
              Arrival in:{" "}
              {arrivalLocation2 +
                ", " +
                arrivalDate2?.toString().split("T")[0] +
                " at " +
                arrivalDate2?.toString().split("T")[1]}
            </li>
            <li>Passengers: {amountOfPassengers}</li>
            <li>Flight ID: {flight_id2}</li>
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
