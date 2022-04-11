import React, { useState, useMemo } from "react";

import "./App.css";

import DatePicker from "./DatePicker";
import DropDownSelect from "./DropDownSelect";
import ReservationList from "./ReservationList";
import { useFetchReservations } from "./hooks/useFetchReservations";
import { getRoomsForDropDown, filterReservations } from "./utils";

const App = () => {
  const [date, setDate] = useState(new Date());
  const [room, setRoom] = useState(undefined);
  const { reservations, loading } = useFetchReservations();

  const rooms = useMemo(() => getRoomsForDropDown(reservations), [
    reservations,
  ]);

  const reservationsFiltered = useMemo(() =>
    filterReservations(reservations, date, room)
  );

  if (loading) return <>Loading...</>;

  return (
    <div className="app">
      <div className="app-filters">
        <div className="app-filter-item">
          <DatePicker value={date} onChange={(newDate) => setDate(newDate)} />
        </div>
        <div className="app-filter-item">
          <DropDownSelect
            value={room}
            onChange={(newRoom) => setRoom(newRoom)}
            options={rooms}
          />
        </div>
      </div>
      <div className="app-reservations">
        <ReservationList reservations={reservationsFiltered} />
      </div>
    </div>
  );
};

export default App;
