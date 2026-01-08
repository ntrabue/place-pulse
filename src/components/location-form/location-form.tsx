import { useState } from "react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import {
  useSearchState,
  useSearchDispatch,
} from "../../state/place-search-state";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";
import { Field } from "../field";
import { Label } from "../ui/label";
import { LocationCombobox } from "../location-combobox";
import { Select } from "../ui/select";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { CurrentLocationToggle } from "../current-location-toggle";

type LocationFormProps = {
  chevron?: boolean;
  asLink?: boolean;
};

export function LocationForm({
  chevron = false,
  asLink = false,
}: LocationFormProps) {
  const globalState = useSearchState();
  const dispatch = useSearchDispatch();

  const [open, setOpen] = useState(false);
  const [local, setLocal] = useState({
    city: globalState.city,
    state: globalState.state,
    radius: globalState.radius,
  });

  const triggerText =
    globalState.city && globalState.state
      ? `${globalState.city}, ${globalState.state}`
      : "Select location";

  const handleSave = () => {
    dispatch({
      type: "SET_LOCATION",
      payload: local,
    });
    setOpen(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      // Reset local state to global state when opening
      setLocal({
        city: globalState.city,
        state: globalState.state,
        radius: globalState.radius,
      });
    }
    setOpen(isOpen);
  };

  const isValid = local.city && local.state;

  return (
    <div className="flex items-center">
      <CurrentLocationToggle
        onLocationDetected={(location) => {
          dispatch({
            type: "SET_LOCATION",
            payload: {
              city: location.city,
              state: location.state,
              radius: globalState.radius,
            },
          });
        }}
      />
      <Dialog open={open} onOpenChange={handleOpenChange}>
        {asLink ? (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
            className="flex gap-2 text-blue-300 underline"
          >
            {triggerText} {chevron && <ChevronDown />}
          </a>
        ) : (
          <DialogTrigger className="flex gap-2">
            {triggerText} {chevron && <ChevronDown />}
          </DialogTrigger>
        )}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Location Settings</DialogTitle>
          </DialogHeader>
          <Field>
            <Label>Location</Label>
            <LocationCombobox
              value={{ city: local.city, state: local.state }}
              onChange={(location) => {
                setLocal((current) => ({
                  ...current,
                  city: location.city,
                  state: location.state,
                }));
              }}
              autoFocus
            />
          </Field>

          <Field>
            <Label htmlFor="radius">Search Radius</Label>
            <Select
              id="radius"
              value={local.radius.toString()}
              onChange={(e) =>
                setLocal((current) => ({
                  ...current,
                  radius: Number(e.target.value),
                }))
              }
            >
              <option value="5">5 miles</option>
              <option value="15">15 miles</option>
              <option value="30">30 miles</option>
            </Select>
          </Field>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!isValid}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
