import { format, isEqual } from "date-fns";

/**
 * @param {{ start: Date, end: Date }[]} reservations - list of reservations
 *
 * @returns true if any 2 reservations conflict
 *   - reservations conflict if their times overlap in any way
 *   - reservations DO NOT conflict if they are just touching each other (reservation1.end === reservation2.start)
 */
export const isScheduleConflict = (reservations = []) => {
  if (reservations.length === 0) return false;

  let prevEndDate;
  for (let index = 0; index < reservations.length; index++) {
    const reservation = reservations[index];

    if (new Date(reservation.start) > new Date(reservation.end)) return true;

    if (!prevEndDate) {
      prevEndDate = reservation.end;
      continue;
    }

    if (isEqual(new Date(reservation.start), new Date(prevEndDate)))
      return true;

    prevEndDate = reservation.end;
  }

  return false;
};

export const getRoomsForDropDown = (reservations) => {
  const filterReservations = (reservations, reservation) => {
    const { room } = reservation;
    if (!reservations[room.id]) {
      reservations[room.id] = room.name;
    }
    return reservations;
  };

  const reservationsFilteredByUniqueRoom = reservations.reduce(
    filterReservations,
    { [undefined]: "UnSelected" }
  );

  return Object.entries(
    reservationsFilteredByUniqueRoom
  ).map(([value, name]) => ({ value, name }));
};

export const areTwoDatesInTheSameDay = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const filterReservations = (reservations, date, roomId) =>
  reservations.filter(({ start, room }) => {
    const areTwoDatesSame = areTwoDatesInTheSameDay(
      new Date(start),
      new Date(date)
    );

    if (roomId === undefined || roomId === "undefined") return areTwoDatesSame;

    return areTwoDatesSame && room.id === roomId;
  });

export const formatTime = (date) => format(new Date(date), "h:mmaa");

export const formatDate = (date) => format(new Date(date), "MMM d Y");
