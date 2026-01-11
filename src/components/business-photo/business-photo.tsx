import { ImageIcon } from "lucide-react";
import { Business } from "../../types";

export function BusinessPhoto({ business }: { business?: Business }) {
  const hasPhoto = !!business?.photos?.length;
  return (
    <div className="flex h-[100] w-[100] items-center justify-center rounded-md bg-gray-200">
      {hasPhoto ? (
        <img
          src={business!.photos![0].url}
          alt={business.name}
          className="h-full w-full rounded-md object-cover"
          loading="lazy"
        />
      ) : (
        <ImageIcon className="h-12 w-12 text-muted-foreground" />
      )}
    </div>
  );
}
