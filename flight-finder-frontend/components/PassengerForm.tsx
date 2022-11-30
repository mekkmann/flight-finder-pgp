import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// TODO: FIGURE OUT HOW TO DO LABELS WHEN MULTIPLE FORMS ON THE SAME PAGE

const PassengerForm = () => {
  const [open, setOpen] = useState(true);
  //   const handleDepartureLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setDepartureLocation(e.target.value);
  //   };

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
              className=""
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <label>+12 (Adult):</label>
              <input type="checkbox" />
            </div>
            <div className="passengerForm_contact">
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
