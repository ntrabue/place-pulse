import { ExternalLinkIcon } from "lucide-react";
import { forwardRef, ComponentPropsWithRef } from "react";
import { cn } from "../../lib/utils";

type AnchorProps = ComponentPropsWithRef<"a"> & {
  stripParams?: boolean;
};

export const ExternalLink = forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        {...props}
        target="_blank"
        className={cn(
          "flex max-w-full flex-row items-center gap-1 p-1",
          props.href ? "text-blue-600" : "text-red-500",
          props.className
        )}
      >
        <span className="block truncate">{children}</span>
        {props.href && <ExternalLinkIcon />}
      </a>
    );
  }
);

ExternalLink.displayName = "LinkWithRef";
