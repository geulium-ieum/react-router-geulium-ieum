import { userContext } from "~/context/userContext";
import type { Route } from "./+types/Detail";
import { getSession } from "~/lib/sessions.server";
import { redirect } from "react-router";
import { familyGroupService } from "~/lib/services/familyGroup";
import { userService } from "~/lib/services/user";

export async function loader({ request, context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  const cookie = request.headers.get("Cookie");
  const session = await getSession(cookie);
  const token = session.get("token");
  if (!user || !token) {
    return redirect('/login');
  }
  const pathname = new URL(request.url).pathname;
  const id = pathname.split("/").pop();
  if (!id) {
    return redirect("/family-groups");
  }
  const familyGroupDetail = await familyGroupService.get.familyGroupDetail({
    id,
    token
  });
  const { content: memberContent } = await familyGroupService.get.familyGroupMemberList({
    id,
    token
  });
  const members = await Promise.all(
    memberContent.map(async (member) => {
      const user = await userService.get.user({
        id: member.userId,
        token
      })
      return {
        ...member,
        user
      }
    })
  )
  const { content: memorialContent } = await familyGroupService.get.familyGroupMemorialList({
    id,
    token
  });

  return {
    user,
    token,
    familyGroupDetail,
    members,
    memorialContent
  };
}

export default function FamilyGroupDetail({ loaderData }: Route.ComponentProps) {
  const {
    user,
    token,
    familyGroupDetail,
    members,
    memorialContent
  } = loaderData

  return (
    <></>
  )
}