export const toMonthYearFormat = (date: string) => {
  const dateToFormat = new Date(date);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "2-digit",
  }).format(dateToFormat);

  return formattedDate;
};

export const toReadableFormat = (date: string) => {
  const dateToFormat = new Date(date);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(dateToFormat);

  return formattedDate;
};
