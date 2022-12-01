import React, { createContext } from "react";
type passenger = {
  firstName: string;
  lastName: string;
  dob: Date;
  email: string;
  phone: string;
  isAdult: boolean;
};
type GlobalContent = {
  passengerList: passenger[];
  setPassengerList: React.Dispatch<React.SetStateAction<passenger[]>>;
};
export const Context = createContext<GlobalContent>({
  passengerList: [],
  setPassengerList: () => {},
});
