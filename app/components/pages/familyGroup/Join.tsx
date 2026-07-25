import type { Route } from "./+types/Join";

export async function loader({ request, context }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("id");
  console.log("query", query);
}

export default function Join() {
  return null;
}