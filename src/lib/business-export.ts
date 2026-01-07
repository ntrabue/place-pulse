import { Business } from "../types/business";

/**
 * None of these are used yet
 * Originally I was just going to export all results.
 * I'm thinking that the user will probably be able to
 * select busiensses and then export the ones they have
 * selected instead of everything.
 */

export function generateCSV({ results }: { results: Business[] }) {
  const headers = [
    "Name",
    "Address",
    "Phone",
    "Website",
    "Rating",
    "Total Ratings",
    "Latitude",
    "Longitude",
  ];

  const csvData = results.map((business) => [
    business.name,
    business.address,
    business.phoneNumber || "",
    business.website || "",
    business.rating || "",
    business.userRatingsTotal || "",
    business.location.lat,
    business.location.lng,
  ]);

  const csv = [
    headers.join(","),
    ...csvData.map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `place-pulse-export-${
    new Date().toISOString().split("T")[0]
  }.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function generateJSON({ results }: { results: Business[] }) {
  const json = JSON.stringify(results, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `place-pulse-export-${
    new Date().toISOString().split("T")[0]
  }.json`;
  a.click();
  URL.revokeObjectURL(url);
}
