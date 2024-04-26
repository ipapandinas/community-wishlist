import dayjs from "dayjs";

export const formatDate = (date: Date, withSi = true): string => {
  const now = dayjs();
  const targetDate = dayjs(date);
  const diff = targetDate.diff(now, "second");
  const isPast = diff <= 0;

  const sec = Math.abs(diff);
  const min = Math.floor(sec / 60);
  const hour = Math.floor(sec / 3600);
  const day = Math.floor(hour / 24);
  const month = Math.floor(day / 30.44); // Approximation for months
  const year = Math.floor(day / 365.25); // Approximation for leap years

  let value = 1;
  let unit = "min";
  const si = isPast ? "ago" : "";

  if (min > 0 && min < 60) {
    value = min;
    unit = "min";
  } else if (hour > 0 && hour < 24) {
    value = hour;
    unit = "hour";
  } else if (day > 0 && day < 31) {
    value = day;
    unit = "day";
  } else if (month > 0 && month < 12) {
    value = month;
    unit = "month";
  } else if (year > 0) {
    value = year;
    unit = "year";
  }

  return `${Math.floor(value)} ${unit}${value > 1 ? "s" : ""}${withSi ? " " + si : ""}`;
};
