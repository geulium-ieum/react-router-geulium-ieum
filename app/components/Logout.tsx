import { getSession } from "~/lib/sessions.server";
import { destroySession } from "~/lib/sessions.server";
import type { Route } from "./+types/Logout";
import { redirect } from "react-router";
import { useState } from "react";
import { Spinner } from "./ui/spinner";

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const [isLoading, setIsLoading] = useState(true);
  try {
    return redirect("/", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
  if (!isLoading) {
    return <Spinner className="size-8" />;
  }
}
export default function Logout() {
  return null;
}
