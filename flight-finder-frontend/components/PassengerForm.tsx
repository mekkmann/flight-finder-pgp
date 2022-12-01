import React, { useState, useEffect, useContext } from "react";
import { Context } from "../helpers/Context";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// TODO: FIGURE OUT HOW TO DO LABELS WHEN MULTIPLE FORMS ON THE SAME PAGE
type passenger = {
  firstName: string;
  lastName: string;
  dob: Date;
  email: string;
  phone: string;
  isAdult: boolean;
};
interface IMyProps {
  increaseChildren: React.Dispatch<React.SetStateAction<number>>;
  increaseAdults: React.Dispatch<React.SetStateAction<number>>;
  indexOfPassenger: number;
}
const PassengerForm: React.FC<IMyProps> = (props: IMyProps) => {
  const { passengerList, setPassengerList } = useContext(Context);

  const [open, setOpen] = useState<boolean>(true);

  // for passenger creation
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dob, setDob] = useState<Date>(new Date("1968-03-27"));
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isAdult, setIsAdult] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [passenger, setPassenger] = useState<passenger>({
    firstName: firstName,
    lastName: lastName,
    dob: dob,
    email: email,
    phone: phone,
    isAdult: isAdult,
  });

  // sets isAdult based on dob
  useEffect(() => {
    console.log(dob.toISOString().split("T")[0].split("-")[0]);
    if (Number(dob.toISOString().split("T")[0].split("-")[0]) <= 2010) {
      setIsAdult(true);
    } else {
      setIsAdult(false);
    }
  }, [dob]);

  // to keep form filled on backward navigation
  useEffect(() => {
    if (passengerList[0]) {
      setFirstName(passengerList[props.indexOfPassenger].firstName);
      setLastName(passengerList[props.indexOfPassenger].lastName);
      setDob(passengerList[props.indexOfPassenger].dob);
      setEmail(passengerList[props.indexOfPassenger].email);
      setPhone(passengerList[props.indexOfPassenger].phone);
    }
  }, []);

  // sets variables of passenger based on states
  useEffect(() => {
    setPassenger({
      firstName: firstName,
      lastName: lastName,
      dob: dob,
      email: email,
      phone: phone,
      isAdult: isAdult,
    });
  }, [dob, firstName, lastName, email, phone, isAdult]);

  // handles input
  const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  // confirms passenger, adds it to passengerList and increases passenger type
  const confirmPassenger = () => {
    setConfirmed(true);
    setPassengerList([...passengerList, passenger]);
    if (isAdult) {
      props.increaseAdults(0);
    }
    if (!isAdult) {
      props.increaseChildren(0);
    }
  };

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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>{isAdult ? "Passenger" : "Passenger (Child)"}</h3>
        <button onClick={() => setOpen(!open)}>
          {open ? "Close" : "Open"}
        </button>
      </div>

      {/* TODO: REMOVE BUTTONS BELOW */}
      <button onClick={() => console.log(passengerList)}>passengerList</button>
      <button onClick={() => setPassengerList([])}>reset passengerList</button>

      {open ? (
        <>
          <div
            className="passengerForm_names"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => handleFirstName(e)}
            />
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => handleLastName(e)}
            />
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
              <DatePicker
                selected={dob}
                onChange={(date: Date) => setDob(date)}
              />
            </div>
            <div
              className="passengerForm_contact"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => handleEmail(e)}
              />
              <label>Phone:</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => handlePhone(e)}
              />
            </div>
          </div>
          <br />
          <button onClick={() => confirmPassenger()} disabled={confirmed}>
            Confirm Passenger
          </button>
        </>
      ) : null}
    </div>
  );
};

export default PassengerForm;
