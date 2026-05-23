import { getSession } from "~/lib/sessions.server";
import { destroySession } from "~/lib/sessions.server";
import type { Route } from "./+types/Logout";
import { redirect } from "react-router";

export async function action({ request }: Route.ActionArgs) {
    const session = await getSession(request.headers.get('Cookie'));
    try {
        return redirect('/', {
            headers: {
                "Set-Cookie": await destroySession(session),
            },
        });
    } catch (error) {
        console.error(error);
    }
}
export default function Logout() { 
    return null;
}