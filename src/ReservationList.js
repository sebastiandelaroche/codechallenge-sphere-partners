import React from "react";

import Reservation from "./Reservation";

const ReservationList = ({ reservations }) => (
  <div>
    {reservations.map((reservation) => (
      <Reservation
        key={`reservation_${reservation.id}`}
        reservation={reservation}
      />
    ))}
  </div>
);

export default ReservationList;
