import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useState, useEffect } from "react";
import type { Route } from "./+types/FindPassword";
import { userService } from "~/lib/services/user";
import { redirect } from "react-router";
import { Form } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  console.log("email", email);
  try {
    await userService.post.changePassword({ email });
    return redirect("/login");
  } catch (error) {
    console.log(error);
  }
}

export default function FindPassword() {
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const emailFromLocalStorage = window.localStorage.getItem("email");
    if (emailFromLocalStorage) {
      setEmail(emailFromLocalStorage);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle>비밀번호 재설정</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="POST" className="flex flex-col gap-4 w-78">
            <Input type="hidden" name="email" value={email} />
            <Input
              className="mb-2 bg-white"
              type="text"
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button className="w-full" type="submit" disabled={!email}>
              인증 요청
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
