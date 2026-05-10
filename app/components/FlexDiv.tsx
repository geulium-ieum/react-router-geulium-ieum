import { cn } from "~/lib/utils";
import type { Children } from "~/types";

export default function FlexDiv({
    className,
    children,
    ...props
}: React.ComponentProps<"div"> & {
    children?: Children,
    className?: string
}) {
    return (
        <div
            className={cn("flex", className)}
            {...props}
        >
            {children}
        </div>
    )
}
