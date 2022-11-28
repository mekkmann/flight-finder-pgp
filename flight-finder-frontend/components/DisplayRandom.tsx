import React, { useState, useEffect } from "react";
import Link from "next/link";

// TODO: define type flight

function DisplayRandom() {
  const [flights, setFlights] = useState([]); // TODO: add type to usestate
  const [isLoading, setLoading] = useState<boolean>(false);

  function consoleFlight() {
    console.log(flights);
  }

  useEffect(() => {
    setLoading(true);
    fetch("https://localhost:7283/flights/search")
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
      <button onClick={consoleFlight}>Console Log all flights</button>
      <ul>
        <li>hello</li>
        <li>bye</li>
      </ul>
    </>
  );
}

export default DisplayRandom;
