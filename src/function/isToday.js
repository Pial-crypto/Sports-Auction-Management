export function isToday(dateString) {
  if (!dateString) return false;

  const inputDate = new Date(dateString);
  const now = new Date();

  return (
    inputDate.getUTCFullYear() === now.getUTCFullYear() &&
    inputDate.getUTCMonth() === now.getUTCMonth() &&
    inputDate.getUTCDate() === now.getUTCDate()
  );
}
