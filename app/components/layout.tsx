import { Outlet } from "react-router";
import { Toaster } from "./ui/sonner";

export default function RootLayout() {
    return (
        <div className="h-[calc(100vh-73px)] bg-gray-50">
            <main>
                <Outlet />
            </main>
            <Toaster />
        </div>
    )
}
