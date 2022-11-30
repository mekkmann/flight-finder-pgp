import React, { useState, useEffect } from "react";
import Link from "next/link";
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

interface IMyProps {
  urlToFetch: string;
}

const DisplayResults: React.FC<IMyProps> = (props: IMyProps) => {
  const [flights, setFlights] = useState<flight[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  function consoleFlight() {
    console.log(flights);
  }
  function consoleSWAPI() {
    fetch(props.urlToFetch)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
      })
      .catch((e) => console.log(e.message));
  }
  // TODO: FIGURE OUT HOW TO MAP INTO ARRAY
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
    return <p>Search for some flights, the Skies await!</p>;

  return (
    <>
      <button onClick={consoleFlight}>Console Log all flights</button>
      <button onClick={consoleSWAPI}>Console Log swapi</button>
      {flights.map((flight, idx) => (
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
      ))}
    </>
  );
};

export default DisplayResults;
