import { Outlet } from "react-router";
import { Toaster } from "./ui/sonner";
import type { Route } from "./+types/layout";
import { cn } from "~/lib/utils";

export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    return { pathname }
}

export default function RootLayout({ loaderData }: Route.ComponentProps) {
    const { pathname } = loaderData;
    
    return (
        <div className={cn("bg-gray-50", pathname === "/guides" ? "h-dvh" : "min-h-[calc(100dvh-73px)]")}>
            <main className="h-full">
                <Outlet />
            </main>
            <Toaster />
        </div>
    )
}
