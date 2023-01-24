import { format } from "date-fns";

export function formatDate(date: string | Date) {
  if (!date) return;

  return format(new Date(date), "MMMM d, yyyy");
}
