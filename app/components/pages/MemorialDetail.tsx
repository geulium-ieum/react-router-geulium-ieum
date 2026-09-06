import { useState } from "react";
import { Calendar, Globe, Heart, Lock, MapPin, Users } from "lucide-react";
import { Form, isRouteErrorResponse, Link, redirect } from "react-router";
import type { Route } from "./+types/MemorialDetail";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Footer } from "~/components/organisms/Footer";
import { userContext } from "~/context/userContext";
import { getSession } from "~/lib/sessions.server";
import { memorialService } from "~/lib/services/memorial";
import { calculateAge } from "~/lib/utils";
import type { Memorial, Status, User, Visibility } from "~/types";
import { MessageCircle } from "lucide-react";

const visibilityLabel: Record<Visibility, string> = {
  PUBLIC: "공개",
  PRIVATE: "비공개",
  FAMILY_ONLY: "가족만",
};

const statusLabel: Record<Status, string> = {
  PENDING: "승인 대기",
  APPROVED: "승인",
  REJECT: "거절",
  CANCEL: "취소",
};

function formatDate(value: string) {
  return value.replace(/-/g, ".");
}

export async function loader({ request, context, params }: Route.LoaderArgs) {
  const user = context.get(userContext);
  const cookie = request.headers.get("Cookie");
  const session = await getSession(cookie);
  const token = session.get("token");
  const id = params.id;

  if (!id) {
    throw new Response("Not Found", { status: 404 });
  }

  try {
    const memorial = await memorialService.get.memorialDetail({ id, token });
    return { user, token, memorial };
  } catch (error) {
    console.error(error);
    throw new Response("Not Found", { status: 404 });
  }
}

export async function action({ request, context, params }: Route.ActionArgs) {
  const user = context.get(userContext);
  const cookie = request.headers.get("Cookie");
  const session = await getSession(cookie);
  const token = session.get("token");
  const id = params.id;

  if (!user || !token || !id) {
    return redirect("/login");
  }

  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "delete") {
    await memorialService.delete.memorialDetail({ id, token });
    return redirect("/search");
  }

  if (intent === "update") {
    const deceasedName = formData.get("deceasedName") as string;
    const location = formData.get("location") as string;
    const birthDate = formData.get("birthDate") as string;
    const deathDate = formData.get("deathDate") as string;
    const biography = formData.get("biography") as string;
    const visibility = formData.get("visibility") as Visibility;
    const status = formData.get("status") as Status;
    const photoUrl = formData.get("photoUrl") as string;

    if (!deceasedName || !birthDate || !deathDate) {
      return { error: "필수 항목을 모두 입력해주세요." };
    }

    await memorialService.put.memorialDetail({
      id,
      token,
      deceasedName,
      location,
      birthDate,
      deathDate,
      biography,
      visibility,
      status,
      photoUrl,
    });
    return { ok: true };
  }

  return { error: "처리할 수 없는 요청입니다." };
}

function visibilityText(visibility: Visibility) {
  return visibilityLabel[visibility];
}

function statusText(status: Status) {
  return statusLabel[status];
}

export default function MemorialDetail({ loaderData }: Route.ComponentProps) {
  if (!loaderData) {
    return null;
  }

  const { user, memorial } = loaderData as {
    user: User | null;
    memorial: Memorial;
  };
  const isOwner = Boolean(user && user.id === memorial.createdBy);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl min-h-[calc(100vh-398px)] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl text-gray-900 mb-2">추모관</h1>
            <p className="text-gray-600">사랑하는 분을 기억하는 공간입니다</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/search">목록으로 돌아가기</Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          <Card className="overflow-hidden py-0 h-fit">
            <div className="aspect-square relative bg-gray-200">
              <img
                src={memorial.photoUrl || "https://placehold.co/640x640/png"}
                alt={memorial.deceasedName}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                {memorial.visibility === "PUBLIC" ? (
                  <Badge
                    variant="secondary"
                    className="bg-white/80 text-gray-900"
                  >
                    <Globe className="w-3 h-3 mr-1" />
                    {visibilityText(memorial.visibility)}
                  </Badge>
                ) : memorial.visibility === "FAMILY_ONLY" ? (
                  <Badge
                    variant="secondary"
                    className="bg-gray-900/80 text-white"
                  >
                    <Users className="w-3 h-3 mr-1" />
                    {visibilityText(memorial.visibility)}
                  </Badge>
                ) : (
                  <Badge
                    variant="secondary"
                    className="bg-gray-900/80 text-white"
                  >
                    <Lock className="w-3 h-3 mr-1" />
                    {visibilityText(memorial.visibility)}
                  </Badge>
                )}
              </div>
            </div>
            <div className="p-6 space-y-3">
              <h2 className="text-2xl text-gray-900">
                {memorial.deceasedName}
              </h2>
              <p className="text-sm text-gray-500">
                향년 {calculateAge(memorial.birthDate)}세
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                {formatDate(memorial.birthDate)} ~{" "}
                {formatDate(memorial.deathDate)}
              </p>
              {memorial.location && (
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {memorial.location}
                </p>
              )}
              <Badge variant="outline">{statusText(memorial.status)}</Badge>
            </div>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-purple-600" />
                  소개
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {memorial.biography || "아직 소개가 등록되지 않았습니다."}
                </p>
              </CardContent>
            </Card>

            {isOwner && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>추모관 관리</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEdit((prev) => !prev)}
                  >
                    {isEdit ? "취소" : "수정"}
                  </Button>
                </CardHeader>
                <CardContent>
                  {isEdit ? (
                    <Form method="post" className="space-y-4">
                      <input type="hidden" name="intent" value="update" />
                      <input
                        type="hidden"
                        name="status"
                        value={memorial.status}
                      />
                      <input
                        type="hidden"
                        name="photoUrl"
                        value={memorial.photoUrl ?? ""}
                      />
                      <div>
                        <Label htmlFor="deceasedName">이름 *</Label>
                        <Input
                          id="deceasedName"
                          name="deceasedName"
                          defaultValue={memorial.deceasedName}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">안치 장소</Label>
                        <Input
                          id="location"
                          name="location"
                          defaultValue={memorial.location ?? ""}
                          className="mt-2"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="birthDate">생년월일 *</Label>
                          <Input
                            id="birthDate"
                            name="birthDate"
                            type="date"
                            defaultValue={memorial.birthDate}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="deathDate">기일 *</Label>
                          <Input
                            id="deathDate"
                            name="deathDate"
                            type="date"
                            defaultValue={memorial.deathDate}
                            className="mt-2"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="biography">소개</Label>
                        <Textarea
                          id="biography"
                          name="biography"
                          rows={6}
                          defaultValue={memorial.biography ?? ""}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="visibility">공개 여부</Label>
                        <select
                          id="visibility"
                          name="visibility"
                          defaultValue={memorial.visibility}
                          className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          <option value="PUBLIC">공개</option>
                          <option value="PRIVATE">비공개</option>
                          <option value="FAMILY_ONLY">가족만</option>
                        </select>
                      </div>
                      <div className="flex justify-end gap-3">
                        <Button type="submit">저장</Button>
                      </div>
                    </Form>
                  ) : (
                    <Form
                      method="post"
                      onSubmit={(event) => {
                        if (!confirm("정말로 추모관을 삭제하시겠습니까?")) {
                          event.preventDefault();
                        }
                      }}
                    >
                      <input type="hidden" name="intent" value="delete" />
                      <p className="text-sm text-gray-600 mb-4">
                        등록한 추모관을 수정하거나 삭제할 수 있습니다.
                      </p>
                      <Button type="submit" variant="destructive">
                        추모관 삭제
                      </Button>
                    </Form>
                  )}
                </CardContent>
              </Card>
            )}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-purple-600 mr-2" />
                  추모글
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed"></p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl min-h-[calc(100vh-398px)] mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl text-gray-900 mb-4">
          {isNotFound ? "추모관을 찾을 수 없습니다" : "오류가 발생했습니다"}
        </h1>
        <p className="text-gray-600 mb-8">
          {isNotFound
            ? "삭제되었거나 비공개 추모관일 수 있습니다."
            : "잠시 후 다시 시도해주세요."}
        </p>
        <Button asChild>
          <Link to="/search">고인 검색으로 돌아가기</Link>
        </Button>
      </div>
      <Footer />
    </div>
  );
}
