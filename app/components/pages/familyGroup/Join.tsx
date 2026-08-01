import type { Route } from "./+types/Join";
import { Spinner } from "~/components/ui/spinner";
import { userContext } from "~/context/userContext";
import { getSession } from "~/lib/sessions.server";
import { redirect } from "react-router";
import { useState } from "react";
import { familyGroupService } from "~/lib/services/familyGroup";

export async function loader({ request, context }: Route.ActionArgs) {
  const user = context.get(userContext);
  const cookie = request.headers.get("Cookie");
  const session = await getSession(cookie);
  const token = session.get("token");
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!user || !token) {
    return redirect("/login");
  }
  if (!id) {
    return redirect("/");
  }
  try {
    await familyGroupService.post.joinFamilyGroup({
      id,
      token,
    });
    return redirect("/");
  } catch (error) {
    console.log(error);
  }
}

export default function Join() {
  const [isLoading, setIsLoading] = useState(false);
  return <div>{isLoading && <Spinner />}</div>;
}
