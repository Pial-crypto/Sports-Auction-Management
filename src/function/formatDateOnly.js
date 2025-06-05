 export function formatDateOnly(date) {
  return date.toISOString().split('T')[0]; // '2025-06-05'
}