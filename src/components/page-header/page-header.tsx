import { MapPin } from "lucide-react";
import { LocationForm } from "../location-form";

export function PageHeader() {
  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
              <MapPin className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Place Pulse</h1>
              <p className="mt-0.5 text-sm text-blue-100">
                Discover local businesses
              </p>
            </div>
          </div>
          <LocationForm chevron />
        </div>
      </div>
    </div>
  );
}
