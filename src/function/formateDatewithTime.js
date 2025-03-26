import { format } from "date-fns";

const formatDateWithTime = (isoString) => {
  const date = new Date(isoString);
  return format(date, "yyyy-MM-dd EEEE h:mm a");
};

export default formatDateWithTime;