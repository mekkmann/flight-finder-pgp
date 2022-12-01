import React, { useState, useEffect } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// TODO: FIGURE OUT HOW TO DO LABELS WHEN MULTIPLE FORMS ON THE SAME PAGE
interface IMyProps {
  increaseChildren: React.Dispatch<React.SetStateAction<number>>;
  increaseAdults: React.Dispatch<React.SetStateAction<number>>;
}
const PassengerForm: React.FC<IMyProps> = (props: IMyProps) => {
  const [open, setOpen] = useState<boolean>(true);
  const [isAdult, setAdult] = useState<boolean>(true);
  //   const handleDepartureLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setDepartureLocation(e.target.value);
  //   };

  // useEffect(() => {
  //   if (!isAdult) {
  //     props.increaseChildren;
  //   }
  // }, [isAdult]);

  return (
    <div
      className="passengerForm"
      style={{
        border: "2px solid black",
        marginBottom: "1rem",
        display: "flex",
        flexDirection: "column",
        width: "70vw",
        padding: "1rem",
        justifyContent: "space-around",
      }}
    >
      <h3>Passenger</h3>
      <button onClick={() => setOpen(!open)}>{open ? "Close" : "Open"}</button>
      <button onClick={() => props.increaseAdults(0)}>+ Adult</button>
      <button onClick={() => props.increaseChildren(0)}>+ Child</button>
      {open ? (
        <>
          <div
            className="passengerForm_names"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>First Name:</label>
            <input type="text" />
            <label>Last Name:</label>
            <input type="text" />
          </div>
          <div
            className="passengerForm_dobAndAgeCheck"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>Date of Birth:</label>
              <input type="date" />
            </div>
            <div
              className="passengerForm_contact"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label>Email:</label>
              <input type="email" />
              <label>Phone:</label>
              <input type="tel" />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default PassengerForm;
