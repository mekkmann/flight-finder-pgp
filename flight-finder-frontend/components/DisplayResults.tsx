import React, { useState, useEffect } from "react";
import Link from "next/link";
import ItineraryCard from "./ItineraryCard";

// TODO: define type flight

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

interface IMyProps {
  urlToFetch: string;
}

const DisplayResults: React.FC<IMyProps> = (props: IMyProps) => {
  const [flights, setFlights] = useState<flight[]>([]); // TODO: add type to usestate
  const [isLoading, setLoading] = useState<boolean>(false);

  function consoleFlight() {
    console.log(flights);
  }

  useEffect(() => {
    console.log(props.urlToFetch);
    setLoading(true);
    fetch(props.urlToFetch)
      .then((res) => res.json())
      .then((data) => {
        setFlights([data]);
        setLoading(false);
      })
      .catch((e) => console.log(e.message));
  }, [props.urlToFetch]);

  if (flights.length == 0)
    return (
      <p>We couldn't find any flights at the moment. Please try again later!</p>
    );
  // return <p>placeholder</p>;
  return (
    <>
      <button onClick={consoleFlight}>Console Log all flights</button>
      {/* {flights.map((flight, idx) => (
        <>
          <h2 key={flight.flight_id + idx}>
            Outbound from: {flight.departureDestination} | Arrival in:{" "}
            {flight.arrivalDestination}
          </h2>
          {flight.itineraries.map((itinerary, index) => (
            <ItineraryCard
              itinerary={itinerary}
              flightId={flight.flight_id}
              arrivalDestination={flight.arrivalDestination}
              departureDestination={flight.departureDestination}
            />
          ))}
        </>
      ))} */}
    </>
  );
};

export default DisplayResults;
