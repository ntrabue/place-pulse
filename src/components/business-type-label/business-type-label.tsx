import { snakeStrToTitle } from "../../lib/utils/utils";

export function BusinessTypeLabel({ type }: { type: string }) {
  const title = snakeStrToTitle(type);
  if (
    title.toLowerCase() === "point of interest" ||
    title.toLowerCase() === "establishment"
  ) {
    return null;
  }
  return <span className="rounded-md bg-blue-300 p-1 text-xs">{title}</span>;
}
