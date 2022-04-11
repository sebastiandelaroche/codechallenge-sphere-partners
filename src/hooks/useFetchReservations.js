import { useState, useEffect } from "react";
import { get } from "axios";

const RESERVATION_URL =
  "https://cove-coding-challenge-api.herokuapp.com/reservations";

export function useFetchReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const fetchReservations = async () => {
    setLoading(true);
    await get(RESERVATION_URL)
      .then(({ data }) => {
        setReservations(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return { reservations, loading, error };
}
