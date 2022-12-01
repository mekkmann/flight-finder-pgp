import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IMyProps {
  setUrlFunc: React.Dispatch<React.SetStateAction<string>>;
  setAmountOfPassengersFunc: React.Dispatch<React.SetStateAction<number>>;
}

const SearchForm = (props: IMyProps) => {
  const baseUrl: string = "https://localhost:7283/flights/search?";
  const phReturnDate: Date = new Date();
  phReturnDate.setDate(phReturnDate.getDate() + 5);

  const [departureDate, setDepartureDate] = useState<Date>(new Date());
  const [returnDate, setReturnDate] = useState<Date>(phReturnDate);
  const [roundTrip, setRoundTrip] = useState<boolean>(true);
  const [direct, setDirect] = useState<boolean>(false);
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
      returnDate.toISOString().split("T")[0] +
      "&direct=" +
      direct;

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
          />
        </div>
        <div className="searchForm_locations-2">
          <label htmlFor="arrivalDestination">To: </label>
          <input
            type="text"
            name="arrivalDestination"
            id="arrivalDestination"
            onChange={(e) => handleArrivalDestination(e)}
          />
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
      <div className="searchForm_misc">
        <div className="searchForm_misc-people">
          <p>Adults: {numOfAdults}</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              setNumOfAdults(numOfAdults + 1);
            }}
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
          >
            -
          </button>
          <p>Children: {numOfChildren}</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              setNumOfChildren(numOfChildren + 1);
            }}
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
          >
            -
          </button>
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
          <div className="searchForm_misc-flight-direct">
            <label
              htmlFor="direct"
              className="searchForm_misc-flight-direct-label"
            >
              Direct:{" "}
            </label>
            <input
              type="checkbox"
              name="direct"
              id="direct"
              onChange={(e) => {
                setDirect(!direct);
              }}
              className="searchForm_misc-flight-direct-input"
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
      >
        Search Flights
      </button>
    </div>
  );
};

export default SearchForm;
