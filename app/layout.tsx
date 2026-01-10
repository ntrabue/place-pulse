import type { Metadata } from "next";
import "../src/index.css";
import { QueryProvider } from "../src/state/query-provider";

export const metadata: Metadata = {
  title: "Place Pulse - Find Businesses Without Websites",
  description:
    "Find businesses without websites in your area using Google Places API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
