import Head from "next/head";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/Home.module.css";
import Navbar from "../../../components/Navbar";
import { Context } from "../../../helpers/Context";
import PassengerCard from "../../../components/PassengerCard";
import LastAlert from "../../../components/LastAlert";
import { Button } from "@mui/material";

export default function Home() {
  const { passengerList } = useContext(Context);
  const [modal, setModal] = useState<boolean>(false);
  const [lastCheck, setLastCheck] = useState<boolean>(false);
  const [postSuccess, setPostSuccess] = useState<boolean>(false);
  const [waiting, setWaiting] = useState<boolean>(true);
  const [sendEmail, setSendEmail] = useState<boolean>(false);
  const [confirmationEmail, setConfirmationEmail] = useState<string>("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setConfirmationEmail(e.target.value);
  };

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
    duration1,
    duration2,
    totalPrice,
  } = router.query;
  useEffect(() => {
    if (lastCheck) {
      if (sendEmail) setSendEmail(true);
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
    confirmationEmail +
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
    confirmationEmail +
    "&amountOfPassengers=" +
    amountOfPassengers;
  const bookFlight = (url: string) => {
    fetch(url, {
      method: "POST",
      mode: "cors",
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
          <h2>Flights</h2>
          <br />
          <div
            style={{
              border: "0.2rem solid black",
              borderRadius: "1.5rem",
              width: "80%",
              padding: "1rem",
              lineHeight: "2",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            <p>
              Departure from: {departureLocation1 + ", "}
              {departureDate1?.toString().split("T")[0]} at{" "}
              {departureDate1?.toString().split("T")[1]}
            </p>
            <p>
              Arrival in:{" "}
              {arrivalLocation1 +
                ", " +
                arrivalDate1?.toString().split("T")[0] +
                " at " +
                arrivalDate1?.toString().split("T")[1]}
            </p>
            <p>Duration: {duration1 + " hrs"}</p>
            <p>Passengers: {amountOfPassengers}</p>
            <p>Flight ID: {flight_id1}</p>
          </div>
          <br />
          <p style={{ fontWeight: "600" }}>Total: {totalPrice} SEK</p>
          <br />
          <hr style={{ width: "70vw" }} />
          <br />
          {passengerList.map((passenger) => (
            <PassengerCard passenger={passenger} />
          ))}
          <Button
            variant="contained"
            onClick={handleModal}
            style={{ width: "20vw", marginBottom: "1rem", background: "green" }}
            disabled={lastCheck}
          >
            Confirm Booking
          </Button>
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
          <h2>Flights</h2>
          <br />
          <div
            style={{
              border: "0.2rem solid black",
              borderRadius: "1.5rem",
              width: "80%",
              padding: "1rem",
              lineHeight: "2",
              textAlign: "center",
            }}
          >
            <p style={{ fontWeight: "600" }}>
              Departure from: {departureLocation1 + ", "}
              {departureDate1?.toString().split("T")[0]} at{" "}
              {departureDate1?.toString().split("T")[1]}
            </p>
            <p style={{ fontWeight: "600" }}>
              Arrival in:{" "}
              {arrivalLocation1 +
                ", " +
                arrivalDate1?.toString().split("T")[0] +
                " at " +
                arrivalDate1?.toString().split("T")[1]}
            </p>
            <p style={{ fontWeight: "600" }}>Duration: {duration1 + " hrs"}</p>
            <p style={{ fontWeight: "600" }}>
              Passengers: {amountOfPassengers}
            </p>
            <p style={{ fontWeight: "600" }}>Flight ID: {flight_id1}</p>
          </div>
          <br />

          <div
            style={{
              border: "0.2rem solid black",
              borderRadius: "1.5rem",
              width: "80%",
              padding: "1rem",
              textAlign: "center",
              lineHeight: "2",
            }}
          >
            <p style={{ fontWeight: "600" }}>
              Departure from: {departureLocation2 + ", "}
              {departureDate2?.toString().split("T")[0]} at{" "}
              {departureDate2?.toString().split("T")[1]}
            </p>

            <p style={{ fontWeight: "600" }}>
              Arrival in:{" "}
              {arrivalLocation2 +
                ", " +
                arrivalDate2?.toString().split("T")[0] +
                " at " +
                arrivalDate2?.toString().split("T")[1]}
            </p>
            <p style={{ fontWeight: "600" }}>Duration: {duration2 + " hrs"}</p>
            <p style={{ fontWeight: "600" }}>
              Passengers: {amountOfPassengers}
            </p>
            <p style={{ fontWeight: "600" }}>Flight ID: {flight_id2}</p>
          </div>
          <br />
          <p style={{ fontWeight: "600" }}>Total: {totalPrice} SEK</p>
          <br />
          <hr style={{ width: "70vw" }} />
          <br />
          <h2>Passengers</h2>
          <br />
          {passengerList.map((passenger) => (
            <PassengerCard passenger={passenger} />
          ))}
          <div
            className="confirmationEmail"
            style={{
              width: "50vw",
              border: "0.2rem solid black",
              padding: "1rem",
              borderRadius: "1.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "orchid",
            }}
          >
            <label
              htmlFor="confirmationEmailInput"
              style={{ fontWeight: "600" }}
            >
              Email:
            </label>
            <input
              type="email"
              id="confirmationEmailInput"
              onChange={(e) => handleEmail(e)}
            ></input>
            <Button
              variant="contained"
              onClick={() => setSendEmail(!sendEmail)}
              disabled={sendEmail}
              style={{ minWidth: "55%", marginTop: "1rem" }}
            >
              {!sendEmail ? "I want a Confirmation Email" : "Perfect!"}
            </Button>
            {!sendEmail ? null : (
              <p>
                If you filled in your email correctly, you'll receive a
                confirmation shortly after booking
              </p>
            )}
          </div>

          <Button
            variant="contained"
            onClick={handleModal}
            style={{
              width: "20vw",
              marginBottom: "1rem",
              backgroundColor: "green",
              marginTop: "1rem",
            }}
            disabled={lastCheck}
          >
            {" "}
            Confirm Booking
          </Button>
        </main>

        <footer className={styles.footer}></footer>
      </div>
    );
  }
}
