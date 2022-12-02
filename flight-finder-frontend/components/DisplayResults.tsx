import { useState, useEffect } from "react";
import * as React from "react";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/router";
import ItineraryCard from "./ItineraryCard";

type flight = {
  flight_id: string;
  departureDestination: string;
  arrivalDestination: string;
  itineraries: itinerary[];
};

type itinerary = {
  arriveAt: Date;
  avaliableSeats: number;
  depatureAt: Date;
  prices: price[];
};

type price = {
  adult: number;
  child: number;
  currency: string;
};

type selectedFlight = {
  flight_id?: string;
  departureDate: Date;
  departureLocation: string;
  arrivalLocation: string;
  arrivalDate: Date;
  duration: number;
  price: price;
};
interface IMyProps {
  urlToFetch: string;
  setOutbound: React.Dispatch<React.SetStateAction<selectedFlight[]>>;
  setReturnF: React.Dispatch<React.SetStateAction<selectedFlight[]>>;
  outbound: selectedFlight[];
  returnF: selectedFlight[];
  amountOfPassengers: number;
}

const DisplayOneWayResults: React.FC<IMyProps> = (props: IMyProps) => {
  const [flights, setFlights] = useState<flight[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (props.urlToFetch != "") {
      setLoading(true);
      props.setOutbound([]);
      props.setReturnF([]);
      fetch(props.urlToFetch)
        .then((res) => res.json())
        .then((data) => {
          setFlights(data);
          setLoading(false);
        })
        .catch((e) => console.log(e.message));
    }
  }, [props.urlToFetch]);

  if (isLoading) return <h1>Loading...</h1>;
  if (flights.length == 0 && !isLoading) {
    return (
      <Alert
        style={{
          border: "2px solid #131921",
          backgroundColor: "orchid",
          color: "#131921",
        }}
        icon={false}
      >
        <h3>Why not look for a flight? The sky awaits!</h3>
      </Alert>
    );
  }

  if (
    !flights[0] ||
    !flights[0].itineraries[0] ||
    (flights[1] && !flights[1].itineraries[0])
  ) {
    return (
      <Alert severity="info" style={{ border: "2px solid #131921" }}>
        <h3>No flights for that combination, try something else!</h3>
      </Alert>
    );
  }

  return (
    <>
      {flights.length == 1 ? (
        <div style={{ border: "2px solid red" }}>
          <h1>Your flight: One Way</h1>
          <hr />
          <br />
          <div
            className="selectedFlights"
            style={{
              border: "2px solid black",
              padding: "1rem",
              display: "flex",
            }}
          >
            {props.outbound[0] ? (
              <div style={{ border: "2px solid black" }}>
                <p>
                  {props.outbound[0].departureLocation +
                    " - " +
                    props.outbound[0].arrivalLocation}
                </p>
                <p>{props.outbound[0].flight_id}</p>
                <p>{props.outbound[0].price.adult + " SEK"}</p>
                <button
                  onClick={() => {
                    props.setOutbound([]);
                  }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div style={{ border: "2px solid black" }}>
                <p>AWAITING OUTBOUND CHOICE</p>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              router.push({
                pathname:
                  "/flights/" +
                  "oneWay=" +
                  props.outbound[0].departureLocation +
                  "-" +
                  props.outbound[0].arrivalLocation +
                  "/",
                query: {
                  flight_id1: props.outbound[0].flight_id,
                  departureDate1: props.outbound[0].departureDate.toString(),
                  priceAdult1: props.outbound[0].price.adult,
                  priceChild1: props.outbound[0].price.child,
                  departureLocation1: props.outbound[0].departureLocation,
                  arrivalLocation1: props.outbound[0].arrivalLocation,
                  arrivalDate1: props.outbound[0].arrivalDate.toString(),
                  amountOfPassengers: props.amountOfPassengers,
                  duration1: props.outbound[0].duration,
                },
              });
            }}
          >
            Book Trip
          </button>
        </div>
      ) : (
        <div style={{ border: "2px solid red" }}>
          <h1>Your flight: Round Trip</h1>
          <hr />
          <br />
          <div
            className="selectedFlights"
            style={{
              border: "2px solid black",
              padding: "1rem",
              display: "flex",
            }}
          >
            {props.outbound[0] ? (
              <div style={{ border: "2px solid black" }}>
                <p>
                  {props.outbound[0].departureLocation +
                    " - " +
                    props.outbound[0].arrivalLocation}
                </p>
                <p>{props.outbound[0].flight_id}</p>
                <p>{props.outbound[0].price.adult + " SEK"} </p>
                <button
                  onClick={() => {
                    props.setOutbound([]);
                  }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div style={{ border: "2px solid black" }}>
                <p>AWAITING OUTBOUND CHOICE</p>
              </div>
            )}
            {props.returnF[0] ? (
              <div style={{ border: "2px solid black" }}>
                <p>
                  {props.returnF[0].departureLocation +
                    " - " +
                    props.returnF[0].arrivalLocation}
                </p>
                <p>{props.returnF[0].flight_id}</p>
                <p>{props.returnF[0].price.adult} SEK</p>
                <button
                  onClick={() => {
                    props.setReturnF([]);
                  }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div style={{ border: "2px solid black" }}>
                <p>AWAITING RETURN CHOICE</p>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              router.push({
                pathname:
                  "/flights/" +
                  "roundTrip=" +
                  props.outbound[0].departureLocation +
                  "-" +
                  props.outbound[0].arrivalLocation +
                  "/",
                query: {
                  flight_id1: props.outbound[0].flight_id,
                  departureDate1: props.outbound[0].departureDate.toString(),
                  arrivalDate1: props.outbound[0].arrivalDate.toString(),
                  priceAdult1: props.outbound[0].price.adult,
                  priceChild1: props.outbound[0].price.child,
                  departureLocation1: props.outbound[0].departureLocation,
                  arrivalLocation1: props.outbound[0].arrivalLocation,
                  duration1: props.outbound[0].duration,
                  flight_id2: props.returnF[0].flight_id,
                  departureDate2: props.returnF[0].departureDate.toString(),
                  arrivalDate2: props.returnF[0].arrivalDate.toString(),
                  priceAdult2: props.returnF[0].price.adult,
                  priceChild2: props.returnF[0].price.child,
                  departureLocation2: props.returnF[0].departureLocation,
                  arrivalLocation2: props.returnF[0].arrivalLocation,
                  duration2: props.returnF[0].duration,
                  amountOfPassengers: props.amountOfPassengers,
                },
              });
            }}
          >
            Book Trip
          </button>
        </div>
      )}
      <br />
      <div
        className="itineraryCards"
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          maxWidth: "(713/16)rem",
          justifyContent: "space-around",
        }}
      >
        {flights.map((flight, idx) => (
          <div
            className="itineraryCards-list"
            style={{
              border: "0.225rem solid #131921",
              borderRadius: "1.5rem",
              borderTopRightRadius: "0",
              padding: "1rem",
              width: "42.5%",
              backgroundColor: "orchid",
            }}
          >
            <h2
              key={
                flight.flight_id + idx + flight.itineraries[0].avaliableSeats
              }
            >
              {idx == 1 ? "Return" : "Outbound"} from:{" "}
              {flight.departureDestination} | Arrival in:{" "}
              {flight.arrivalDestination}
            </h2>
            {flight.itineraries.map((itinerary, index) => (
              <ItineraryCard
                key={flight.flight_id + itinerary.avaliableSeats}
                itinerary={itinerary}
                flightId={flight.flight_id}
                arrivalDestination={flight.arrivalDestination}
                departureDestination={flight.departureDestination}
                setDestination={idx == 1 ? props.setReturnF : props.setOutbound}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default DisplayOneWayResults;
