"use client";

import { Button } from "../button";
import { LocateFixed, Loader2 } from "lucide-react";
import { useReverseGeocode } from "../../lib/use-reverse-geocode";

type CurrentLocationToggleProps = {
  onLocationDetected: (location: { city: string; state: string }) => void;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
};

export function CurrentLocationToggle({
  onLocationDetected,
  variant = "ghost",
  size = "icon",
  className,
}: CurrentLocationToggleProps) {
  const { mutate: reverseGeocode, isPending } = useReverseGeocode();

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        reverseGeocode(
          { lat: latitude, lng: longitude },
          {
            onSuccess: (data) => {
              onLocationDetected(data);
            },
            onError: (error) => {
              console.error("Error getting location:", error);
              alert("Failed to get your location. Please try again.");
            },
          }
        );
      },
      (error) => {
        console.error("Geolocation error:", error);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("Location permission denied. Please enable location access.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location information unavailable.");
            break;
          case error.TIMEOUT:
            alert("Location request timed out.");
            break;
          default:
            alert("An unknown error occurred.");
        }
      }
    );
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleGetCurrentLocation}
      disabled={isPending}
      className={className}
      title="Use current location"
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <LocateFixed className="h-4 w-4" />
      )}
    </Button>
  );
}
