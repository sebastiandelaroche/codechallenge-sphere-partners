import { isScheduleConflict } from "./utils";
import {
  reservationConflicts,
  reservationNotConflicts,
  reservationEndDateGraterThanStartDate,
} from "./test.fixtures";

describe("isScheduleConflict", () => {
  it("returns [false] for an empty list", () => {
    expect(isScheduleConflict([])).toBe(false);
  });

  it("should returns [true] for conflicts in reservations", () => {
    expect(isScheduleConflict(reservationConflicts)).toBe(true);
  });

  it("should returns [false] for not having conflicts in reservations", () => {
    expect(isScheduleConflict(reservationNotConflicts)).toBe(false);
  });

  it("should fails for data failure", () => {
    expect(isScheduleConflict(reservationEndDateGraterThanStartDate)).toBe(
      true
    );
  });
});
