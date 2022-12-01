import "../styles/globals.css";
import "../styles/Navbar.css";
import "../styles/SearchForm.css";
import { Context } from "../helpers/Context";
import type { AppProps } from "next/app";
import React, { useState } from "react";

type passenger = {
  firstName: string;
  lastName: string;
  dob: Date;
  email: string;
  phone: string;
  isAdult: boolean;
};

export default function App({ Component, pageProps }: AppProps) {
  const [passengerList, setPassengerList] = useState<passenger[]>([]);
  return (
    <Context.Provider value={{ passengerList, setPassengerList }}>
      <Component {...pageProps} />
    </Context.Provider>
  );
}
