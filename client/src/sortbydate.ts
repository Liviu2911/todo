import { Todo } from "./types";

const year = (s: string) => {
  return Number(s.slice(0, 4));
};
const month = (s: string) => {
  return Number(s.slice(5, 7));
};
const day = (s: string) => {
  return Number(s.slice(8, 10));
};
const hour = (s: string) => {
  return Number(s.slice(11, 13));
};
const minutes = (s: string) => {
  return Number(s.slice(14, 16));
};

const swap = (i: number, j: number, dates: Todo[]) => {
  const temp = dates[i];
  dates[i] = dates[j];
  dates[j] = temp;
};

export const sortByDate = (dates: Todo[]) => {
  for (let i = 0; i < dates.length; i++) {
    for (let j = 0; j < dates.length - 1; j++) {
      if (year(dates[i].expires) === year(dates[j].expires)) {
        if (month(dates[i].expires) === month(dates[j].expires)) {
          if (day(dates[i].expires) === day(dates[j].expires)) {
            if (hour(dates[i].expires) === hour(dates[j].expires)) {
              if (minutes(dates[i].expires) === minutes(dates[j].expires))
                continue;
              else if (minutes(dates[i].expires) < minutes(dates[j].expires))
                swap(i, j, dates);
            } else if (hour(dates[i].expires) < hour(dates[j].expires))
              swap(i, j, dates);
          } else if (day(dates[i].expires) < day(dates[j].expires))
            swap(i, j, dates);
        } else if (month(dates[i].expires) < month(dates[j].expires))
          swap(i, j, dates);
      } else if (year(dates[i].expires) < year(dates[j].expires))
        swap(i, j, dates);
    }
  }
};
