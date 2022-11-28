import React, { useState } from "react";
import Link from "next/link";

// TODO: define type traveller

function SearchForm() {
  const [travellers, setTravellers] = useState([{ name: "john" }]); //TODO: add type to usestate

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    //TODO: Implement search
    e.preventDefault();

    console.log("searching....");
  }
  return (
    <form onSubmit={(e) => handleSearch(e)} className="searchForm">
      <div className="searchForm_locations">
        <label htmlFor="departureLocation">From: </label>
        <input type="text" name="departureLocation" id="departureLocation" />
        <label htmlFor="arrivalDestination">To: </label>
        <input type="text" name="arrivalDestination" id="arrivalDestination" />
      </div>
      <div className="searchForm_dates">
        <label htmlFor="outboundFlight">Outbound flight: </label>
        <input type="text" name="outboundFlight" id="outboundFlight" />
        <label htmlFor="returnFlight">Return flight: </label>
        <input type="text" name="returnFlight" id="returnFlight" />
      </div>
      <div className="searchForm_misc">
        <div className="searchForm_misc-people">
          <label htmlFor="adultTravelers">Adults: </label>
          <input
            type="number"
            name="adultTravelers"
            id="adultTravelers"
            min="0"
            max="25"
          />
          <label htmlFor="childTravelers">Children: </label>
          <input
            type="number"
            name="childTravelers"
            id="childTravelers"
            min="0"
            max="25"
          />
        </div>
        <div className="searchForm_misc-flight">
          <label htmlFor="roundTrip">Round trip: </label>
          <input type="checkbox" name="roundTrip" id="roundTrip" />
          <label htmlFor="direct">Direct: </label>
          <input type="checkbox" name="direct" id="direct" />
        </div>
      </div>
      <button type="submit">Search Flights</button>
    </form>
  );
}

export default SearchForm;
