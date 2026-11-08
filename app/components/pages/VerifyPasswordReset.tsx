import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import type { Route } from "./+types/VerifyPasswordReset";
import { userService } from "~/lib/services/user";
import { redirect } from "react-router";
import { Form } from "react-router";
import { toast } from "sonner";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const code = formData.get("code") as string;
  const newPassword = formData.get("newPassword") as string;
  try {
    await userService.post.verifyChangePassword({ email, code, newPassword });
    toast.success("비밀번호 재설정이 완료되었습니다.");
    return redirect("/login");
  } catch (error) {
    console.log(error);
    toast.error("비밀번호 재설정에 실패했습니다.");
    return redirect("/verify-password-reset");
  }
}
export default function VerifyPasswordReset() {
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle>비밀번호 재설정</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="POST" className="flex flex-col gap-4 w-78">
            <Input type="hidden" name="email" value={email} />
            <Input type="hidden" name="code" value={code} />
            <Input type="hidden" name="newPassword" value={newPassword} />
            <Input
              className="mb-2 bg-white"
              type="text"
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              className="mb-2 bg-white"
              type="text"
              placeholder="인증 코드"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Input
              className="mb-2 bg-white"
              type="password"
              placeholder="새 비밀번호"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {newPassword !== confirmNewPassword && (
              <p className="text-red-500">비밀번호가 일치하지 않습니다.</p>
            )}
            <Input
              className="mb-2 bg-white"
              type="password"
              placeholder="새 비밀번호 확인"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <Button
              className="w-full"
              type="submit"
              disabled={
                !email ||
                !code ||
                !newPassword ||
                !confirmNewPassword ||
                newPassword !== confirmNewPassword
              }
            >
              비밀번호 재설정
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
