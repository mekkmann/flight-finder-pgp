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
      style={{
        width: "70vw",
        border: "0.2rem solid black",
        marginBottom: "1rem",
        borderRadius: "1.5rem",
        padding: "1rem",
      }}
    >
      <h3>{props.passenger.isAdult ? "Passenger" : "Passenger (Child)"}</h3>
      <br />
      <p style={{ fontWeight: "600" }}>
        {"Full Name: " +
          props.passenger.firstName +
          " " +
          props.passenger.lastName}
      </p>
      <p style={{ fontWeight: "600" }}>
        {"Date of Birth: " + props.passenger.dob.toISOString().split("T")[0]}
      </p>
      <p style={{ fontWeight: "600" }}>{"Email: " + props.passenger.email}</p>
      <p style={{ fontWeight: "600" }}>{"Phone: " + props.passenger.phone}</p>
    </div>
  );
};

export default PassengerCard;
