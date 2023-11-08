export const formatDate = inputDate => {
  const date = new Date(inputDate);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};
