import { useState } from "react";
import {
  Search,
  Calendar,
  MapPin,
  User,
  Plus,
  Globe,
  Lock,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card } from "~/components/ui/card";
import { Footer } from "~/components/organisms/Footer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { toast } from "sonner";
import { Badge } from "~/components/ui/badge";
import { Form } from "react-router";
import type { Route } from "./+types/SearchDeceased";
import { memorialService } from "~/lib/services/memorial";
import { userContext } from "~/context/userContext";
import type { MemorialFilter } from "~/types";
import RegisterMemorialHallDialog from "~/components/organisms/RegisterMemorialHallDialog";
import { getSession } from "~/lib/sessions.server";

export async function loader({ request, context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  const cookie = request.headers.get("Cookie");
  const session = await getSession(cookie);
  const token = session.get("token");
  return { user, token };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");
  const birthDate = formData.get("birthDate");
  const deathDate = formData.get("deathDate");
  if (!name || !birthDate || !deathDate) {
    try {
      const response = await memorialService.get.memorialList({
        size: 10
      });
      return response.content;
    } catch (error) {
      console.error(error);
    }
  }
  try {
    const response = await memorialService.get.memorialFilter({
      name: name as string,
      birthDate: birthDate as string,
      deathDate: deathDate as string
    });
    return response.content;
  } catch (error) {
    console.error(error);
  }
}

export default function SearchDeceased({
  loaderData,
  actionData
}: Route.ComponentProps) {
  const { user, token } = loaderData;
  const [searchParams, setSearchParams] = useState({
    name: "",
    birthDate: "",
    deathDate: "",
    location: "",
  });
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);

  const handleReset = () => {
    setSearchParams({
      name: "",
      birthDate: "",
      deathDate: "",
      location: "",
    });
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl min-h-[calc(100vh-398px)] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-gray-900 mb-2">
              고인 검색
            </h1>
            <p className="text-gray-600">
              고인의 정보를 입력하여 추모관을 찾아보세요
            </p>
          </div>
          {user && (
            <Button
              onClick={() => setIsRegisterDialogOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />새 추모관 등록
            </Button>
          )}
        </div>

        {/* Search Form */}
        <Card className="p-6 mb-8">
          <Form method="POST">
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label
                  htmlFor="search-name"
                  className="flex items-center gap-2 mb-2"
                >
                  <User className="w-4 h-4" />
                  고인명<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="search-name"
                  name="name"
                  placeholder="예: 김철수"
                  value={searchParams.name}
                  onChange={(e) =>
                    setSearchParams((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <Label
                  htmlFor="search-birth"
                  className="flex items-center gap-2 mb-2"
                >
                  <Calendar className="w-4 h-4" />
                  생년월일
                </Label>
                <Input
                  id="search-birth"
                  name="birthDate"
                  type="date"
                  value={searchParams.birthDate}
                  onChange={(e) =>
                    setSearchParams((prev) => ({
                      ...prev,
                      birthDate: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <Label
                  htmlFor="search-death"
                  className="flex items-center gap-2 mb-2"
                >
                  <Calendar className="w-4 h-4" />
                  사망일
                </Label>
                <Input
                  id="search-death"
                  name="deathDate"
                  type="date"
                  value={searchParams.deathDate}
                  onChange={(e) =>
                    setSearchParams((prev) => ({
                      ...prev,
                      deathDate: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                className="flex-1 md:flex-initial"
              >
                <Search className="w-4 h-4 mr-2" />
                검색
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
              >
                초기화
              </Button>
            </div>
          </Form>
        </Card>

        {/* Search Results */}
        {actionData && (
          <div className="mb-6">
            <p className="text-gray-600">
              총{" "}
              <span className="text-purple-600">
                {actionData?.length}
              </span>
              개의 추모관을 찾았습니다
            </p>
          </div>
        )}

        {actionData && actionData.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {actionData?.map((deceased) => (
              <Card
                key={deceased.id}
                className="overflow-hidden py-0 hover:shadow-lg transition-shadow cursor-pointer"
                // onClick={() => onViewMemorial(deceased.id)}
              >
                <div className="aspect-square relative overflow-hidden bg-gray-200">
                  {deceased.visibility === "PRIVATE" && (
                    <div className="absolute top-3 right-3">
                      <Badge
                        variant="secondary"
                        className="bg-gray-900/80 text-white"
                      >
                        <Lock className="w-3 h-3 mr-1" />
                        비공개
                      </Badge>
                    </div>
                  )}
                  {deceased.visibility === "PUBLIC" && (
                    <>
                      {deceased.photoUrl && (
                        <img
                          src={deceased.photoUrl}
                          alt={deceased.deceasedName}
                          className="w-full h-auto object-cover"
                        />
                      )}
                      <div className="absolute top-3 right-3">
                        <Badge
                          variant="secondary"
                          className="bg-white/80 text-gray-900"
                        >
                          <Globe className="w-3 h-3 mr-1" />
                          공개
                        </Badge>
                      </div>
                    </>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl mb-3">
                    {deceased.deceasedName}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {deceased.birthDate.replace(
                        /-/g,
                        ".",
                      )} ~ {deceased.deathDate.replace(/-/g, ".")}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {deceased.location}
                    </p>
                  </div>
                  <Button
                    className="w-full mt-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      // onViewMemorial(deceased.id);
                    }}
                  >
                    추모관 방문
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {(!actionData || actionData.length === 0) && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl text-gray-900 mb-2">
              검색 결과가 없습니다
            </h3>
            <p className="text-gray-600">
              다른 검색어로 다시 시도해보세요
            </p>
          </div>
        )}
      </div>

      {/* Register Memorial Dialog */}
      <RegisterMemorialHallDialog
        token={token}
        isOpen={isRegisterDialogOpen}
        setIsOpen={setIsRegisterDialogOpen}
      />

      <Footer />
    </div>
  );
}
