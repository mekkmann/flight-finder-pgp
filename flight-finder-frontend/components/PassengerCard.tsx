import React from "react";

type passenger = {
  firstName: string;
  lastName: string;
  dob: Date;
  email: string;
  phone: string;
  isAdult: boolean;
};
interface IMyProps {
  passenger: passenger;
}

const PassengerCard = (props: IMyProps) => {
  return (
    <div
      style={{ width: "70vw", border: "2px solid black", marginBottom: "1rem" }}
    >
      <h3>{props.passenger.isAdult ? "Passenger" : "Passenger (Child)"}</h3>
      <p>
        {"Full Name: " +
          props.passenger.firstName +
          " " +
          props.passenger.lastName}
      </p>
      <p>
        {"Date of Birth: " + props.passenger.dob.toISOString().split("T")[0]}
      </p>
      <p>{"Email: " + props.passenger.email}</p>
      <p>{"Phone: " + props.passenger.phone}</p>
    </div>
  );
};

export default PassengerCard;
