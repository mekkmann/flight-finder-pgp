import React, { useState } from "react";

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
  itinerary: itinerary;
  arrivalDestination: string;
  departureDestination: string;
  flightId: string;
}

const ItineraryCard = (props: IMyProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const getDurationInHrs = () => {
    var duration =
      (new Date(props.itinerary.arriveAt).getTime() -
        new Date(props.itinerary.depatureAt).getTime()) /
      1000 /
      60 /
      60;
    return duration;
  };
  return (
    <div
      className="itineraryCard"
      onClick={handleClick}
      style={{ border: "2px solid black", marginTop: "10px", zIndex: "0" }}
    >
      <h3>{props.departureDestination + ": " + props.itinerary.depatureAt}</h3>
      <h3>{props.arrivalDestination + ": " + props.itinerary.arriveAt}</h3>
      <h3>{"Available seats: " + props.itinerary.avaliableSeats}</h3>
      <h3>{"Duration: " + getDurationInHrs() + " hrs"}</h3>
      <h3>
        {(!open ? "Price (Adult): " : "Adult: ") +
          props.itinerary.prices[0].adult +
          " " +
          props.itinerary.prices[0].currency}
      </h3>
      {!open ? (
        <></>
      ) : (
        <div className="phClassName" style={{ zIndex: "100" }}>
          <h3>
            {"Child: " +
              props.itinerary.prices[0].child +
              " " +
              props.itinerary.prices[0].currency}
          </h3>
          <button onClick={() => console.log("go to book")}>Book</button>
        </div>
      )}
    </div>
  );
};

export default ItineraryCard;
