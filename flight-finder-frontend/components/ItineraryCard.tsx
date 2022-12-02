import { useState } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import Link from "next/link";

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
  arrivalDate: Date;
  price: price;
  departureLocation: string;
  arrivalLocation: string;
  duration: number;
};

interface IMyProps {
  itinerary: itinerary;
  arrivalDestination: string;
  departureDestination: string;
  flightId: string;
  setDestination: React.Dispatch<React.SetStateAction<selectedFlight[]>>;
}

const ItineraryCard = (props: IMyProps) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  let durInHrs: number;

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
    durInHrs = duration;
    return duration;
  };
  return (
    <div
      className="itineraryCard"
      onClick={handleClick}
      style={{
        border: "2px solid #131921",
        marginTop: "10px",
        zIndex: "1",
        padding: "1rem",
        borderRadius: "0.75rem",
        borderBottomRightRadius: "0",
        backgroundColor: "whitesmoke",
        color: "#131921",
      }}
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
          <Button
            variant="contained"
            style={{ marginTop: "1rem" }}
            onClick={(e) => {
              e.preventDefault();
              props.setDestination([
                {
                  flight_id: props.flightId,
                  departureDate: props.itinerary.depatureAt,
                  departureLocation: props.departureDestination,
                  price: props.itinerary.prices[0],
                  arrivalLocation: props.arrivalDestination,
                  arrivalDate: props.itinerary.arriveAt,
                  duration: durInHrs,
                },
              ]);
            }}
          >
            Choose Flight
          </Button>
        </div>
      )}
    </div>
  );
};

export default ItineraryCard;
