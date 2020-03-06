import moment from "moment";

export const formatDate = (date) => {
  const d = moment(date.iso);
  return d.toLocaleString();
}