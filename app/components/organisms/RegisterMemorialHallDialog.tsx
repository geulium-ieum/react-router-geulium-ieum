import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, useNavigate } from "react-router";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Globe, Lock } from "lucide-react";
import { Button } from "../ui/button";
import React, { useState } from "react";
import { toast } from "sonner";
import { uploadService } from "~/lib/services/upload";
import { memorialService } from "~/lib/services/memorial";

export default function RegisterMemorialHallDialog({
  token,
  isOpen,
  setIsOpen
}: {
  token?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [registerData, setRegisterData] = useState({
    name: "",
    birthDate: "",
    deathDate: "",
    location: "",
    biography: "",
    visibility: "PUBLIC" as "PUBLIC" | "PRIVATE",
  });
  
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) {
      toast.error("로그인이 필요합니다.");
      return navigate("/login", { replace: true });
    };

    if (
      !registerData.name ||
      !registerData.birthDate ||
      !registerData.deathDate
    ) {
      toast.error("필수 항목을 모두 입력해주세요");
      return;
    }

    try {
      // TODO: 추모관 이미지 업로드 진행 중
      // const photoUrl = await uploadService.post.memorialPhoto({
      //   token,
      //   memorialId
      // });
      await memorialService.post.memorial({
        token,
        deceasedName: registerData.name,
        location: registerData.location,
        birthDate: registerData.birthDate,
        deathDate: registerData.deathDate,
        biography: registerData.biography,
        visibility: registerData.visibility,
        status: "PENDING",
        photoUrl: ""
      });
      toast.success(
        "추모관 등록 신청이 완료되었습니다. 관리자 승인 후 이용 가능합니다.",
      );
      setIsOpen(false);
      setRegisterData({
        name: "",
        birthDate: "",
        deathDate: "",
        location: "",
        biography: "",
        visibility: "PUBLIC",
      });
    } catch (error) {
      toast.error("오류가 발생했습니다.");
      console.error(error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>새 추모관 등록</DialogTitle>
          <DialogDescription>
            추모관 정보를 입력해주세요. 관리자 승인 후 이용
            가능합니다.
          </DialogDescription>
        </DialogHeader>
        <Form
          onSubmit={handleRegisterSubmit}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reg-name">
                고인명 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="reg-name"
                required
                value={registerData.name}
                onChange={(e) =>
                  setRegisterData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                placeholder="예: 김철수"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-location">안치 위치</Label>
              <Input
                id="reg-location"
                value={registerData.location}
                onChange={(e) =>
                  setRegisterData((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                placeholder="예: 서울추모공원 A동 101호"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-birth">
                생년월일{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="reg-birth"
                type="date"
                required
                value={registerData.birthDate}
                onChange={(e) =>
                  setRegisterData((prev) => ({
                    ...prev,
                    birthDate: e.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-death">
                사망일 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="reg-death"
                type="date"
                required
                value={registerData.deathDate}
                onChange={(e) =>
                  setRegisterData((prev) => ({
                    ...prev,
                    deathDate: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reg-bio">약력 및 소개</Label>
            <Textarea
              id="reg-bio"
              rows={4}
              value={registerData.biography}
              onChange={(e) =>
                setRegisterData((prev) => ({
                  ...prev,
                  biography: e.target.value,
                }))
              }
              placeholder="고인의 생애와 추억을 간단히 작성해주세요"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reg-visibility">
              공개 설정{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Select
              value={registerData.visibility}
              onValueChange={(value: "PUBLIC" | "PRIVATE") =>
                setRegisterData((prev) => ({
                  ...prev,
                  visibility: value,
                }))
              }
            >
              <SelectTrigger id="reg-visibility">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PUBLIC">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    공개 - 모든 사용자가 볼 수 있습니다
                  </div>
                </SelectItem>
                <SelectItem value="PRIVATE">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    비공개 - 가족 그룹 멤버만 볼 수 있습니다
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500 mt-2">
              {registerData.visibility === "PUBLIC"
                ? "누구나 추모관을 방문하고 추모글을 남길 수 있습니다."
                : "가족 그룹에 초대된 멤버만 추모관에 접근할 수 있습니다."}
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>안내사항</strong>
              <br />
              • 추모관 등록 신청 후 관리자 승인까지 1-2일
              소요됩니다.
              <br />
              • 승인 결과는 이메일과 알림으로 안내됩니다.
              <br />• 비공개 추모관은 가족 그룹 생성 후 멤버를
              초대할 수 있습니다.
            </p>
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              취소
            </Button>
            <Button type="submit">등록 신청</Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  )
}