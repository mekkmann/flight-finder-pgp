import React, { useState, useEffect } from "react";
import Link from "next/link";

// TODO: define type flight

interface IMyProps {
  urlToFetch: string;
  roundTrip: boolean;
}

const DisplayResults: React.FC<IMyProps> = (props: IMyProps) => {
  const [flights, setFlights] = useState([]); // TODO: add type to usestate
  const [isLoading, setLoading] = useState<boolean>(false);

  function consoleFlight() {
    console.log(flights);
  }

  useEffect(() => {
    setLoading(true);
    fetch(props.urlToFetch)
      .then((res) => res.json())
      .then((data) => {
        setFlights(data);
        setLoading(false);
      })
      .catch((e) => console.log(e.message));
  }, []);

  if (isLoading) return <p>Loading...</p>;

  if (!flights)
    return (
      <p>
        We couldn't find any random flights at the moment. Please try again
        later!
      </p>
    );

  return (
    <>
      <h2>Search Results: </h2>
      <button onClick={consoleFlight}>Console Log all flights</button>
      <h3>Outbound from {"PHdeparturelocation"}</h3>
      <ul>
        {flights.map((flight, idx) => {
          return <li key={idx}>ph</li>;
        })}
      </ul>
      {props.roundTrip ? <p>roundtrip</p> : <></>}
    </>
  );
};

export default DisplayResults;
