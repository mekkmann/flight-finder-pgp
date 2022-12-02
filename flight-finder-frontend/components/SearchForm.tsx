import { useState } from "react";
import * as React from "react";
import Alert from "@mui/material/Alert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IMyProps {
  setUrlFunc: React.Dispatch<React.SetStateAction<string>>;
  setAmountOfPassengersFunc: React.Dispatch<React.SetStateAction<number>>;
}

const SearchForm = (props: IMyProps) => {
  const baseUrl: string = "https://localhost:7283/flights/search?";

  const [departureDate, setDepartureDate] = useState<Date>(
    new Date("2022-12-12")
  );
  const [returnDate, setReturnDate] = useState<Date>(new Date("2022-12-18"));
  const [roundTrip, setRoundTrip] = useState<boolean>(true);
  const [departureLocation, setDepartureLocation] = useState<string>("");
  const [arrivalDestination, setArrivalDestination] = useState<string>("");
  const [numOfAdults, setNumOfAdults] = useState<number>(1);
  const [numOfChildren, setNumOfChildren] = useState<number>(0);

  const handleDepartureLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartureLocation(e.target.value);
  };
  const handleArrivalDestination = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArrivalDestination(e.target.value);
  };

  function handleGetSearchUrl() {
    const url =
      baseUrl +
      "departureLocation=" +
      departureLocation +
      "&arrivalDestination=" +
      arrivalDestination +
      "&roundTrip=" +
      roundTrip +
      "&adults=" +
      numOfAdults +
      "&children=" +
      numOfChildren +
      "&departureDate=" +
      departureDate.toISOString().split("T")[0] +
      "&returnDate=" +
      returnDate.toISOString().split("T")[0];

    props.setUrlFunc(url);
    props.setAmountOfPassengersFunc(numOfAdults + numOfChildren);
  }
  return (
    <div className="searchForm">
      <div className="searchForm_locations">
        <div className="searchForm_locations-1">
          <label htmlFor="departureLocation">From: </label>
          <input
            type="text"
            name="departureLocation"
            id="departureLocation"
            onChange={(e) => handleDepartureLocation(e)}
            list="locations"
          />
          <datalist id="locations">
            <option>Amsterdam</option>
            <option>Oslo</option>
            <option>Stockholm</option>
          </datalist>
        </div>
        <div className="searchForm_locations-2">
          <label htmlFor="arrivalDestination">To: </label>
          <input
            type="text"
            name="arrivalDestination"
            id="arrivalDestination"
            onChange={(e) => handleArrivalDestination(e)}
            list="locations"
          />
          <datalist id="locations">
            <option>Amsterdam</option>
            <option>Oslo</option>
            <option>Stockholm</option>
          </datalist>
        </div>
      </div>
      <div className="searchForm_dates">
        <div className="searchForm_dates-1">
          <label htmlFor="outboundFlight" className="searchForm_dates-label">
            Outbound flight:{" "}
          </label>
          <DatePicker
            selected={departureDate}
            onChange={(date: Date) => setDepartureDate(date)}
            id="outboundFlight"
            className="searchForm_dates-datePicker"
          />
        </div>
        {roundTrip ? (
          <div className="searchForm_dates-2">
            <label htmlFor="returnFlight" className="searchForm_dates-label">
              Return flight:{" "}
            </label>
            <DatePicker
              selected={returnDate}
              onChange={(date: Date) => setReturnDate(date)}
              id="returnFlight"
              className="searchForm_dates-datePicker"
            />
          </div>
        ) : null}
      </div>
      {departureDate > returnDate && roundTrip ? (
        <Alert severity="warning" style={{ marginTop: "1rem" }}>
          Outbound Flight can't be after Return Flight
          <br />
          Please change dates.
        </Alert>
      ) : null}
      <div className="searchForm_misc">
        <div className="searchForm_misc-people">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <p>Adults: {numOfAdults}</p>
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setNumOfAdults(numOfAdults + 1);
                }}
                style={{ width: "2rem", marginRight: "1rem" }}
              >
                +
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (numOfAdults >= 2) {
                    setNumOfAdults(numOfAdults - 1);
                  }
                }}
                style={{ width: "2rem" }}
              >
                -
              </button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <p>Children: {numOfChildren}</p>

            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setNumOfChildren(numOfChildren + 1);
                }}
                style={{ width: "2rem", marginRight: "1rem" }}
              >
                +
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (numOfChildren >= 1) {
                    setNumOfChildren(numOfChildren - 1);
                  }
                }}
                style={{ width: "2rem" }}
              >
                -
              </button>
            </div>
          </div>
        </div>
        <div className="searchForm_misc-flight">
          <div className="searchForm_misc-flight-roundTrip">
            <label
              htmlFor="roundTrip"
              className="searchForm_misc-flight-roundTrip-label"
            >
              Round trip:{" "}
            </label>
            <input
              type="checkbox"
              name="roundTrip"
              id="roundTrip"
              checked={roundTrip}
              onChange={(e) => {
                setRoundTrip(!roundTrip);
              }}
              className="searchForm_misc-flight-roundTrip-input"
            />
          </div>
        </div>
      </div>
      <button
        className="searchForm_button"
        onClick={(e) => {
          e.preventDefault();
          handleGetSearchUrl();
        }}
        disabled={departureDate > returnDate && roundTrip}
      >
        Search Flights
      </button>
    </div>
  );
};

export default SearchForm;
