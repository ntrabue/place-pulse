import { MapPin } from "lucide-react";
import { LocationForm } from "../location-form";

export function PageHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
              <MapPin className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Place Pulse</h1>
              <p className="text-blue-100 text-sm mt-0.5">
                Discover local businesses
              </p>
            </div>
          </div>
          <LocationForm />
        </div>
      </div>
    </div>
  );
}
