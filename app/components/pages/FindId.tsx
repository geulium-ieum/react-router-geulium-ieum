import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import type { Route } from "./+types/FindId";
import { userService } from "~/lib/services/user";
import { redirect } from "react-router";
import { Form } from "react-router";
import { useState } from "react";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  try {
    await userService.post.findId({ name, phone });
    return redirect("/login");
  } catch (error) {
    console.error(error);
  }
}

export default function FindId() {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle>아이디 찾기</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="POST" className="flex flex-col gap-4 w-78">
            <Input type="hidden" name="name" value={name} />
            <Input type="hidden" name="phone" value={phone} />
            <Input
              className="mb-2"
              value={name}
              type="text"
              placeholder="이름"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              className="mb-2"
              value={phone}
              type="text"
              placeholder="010-1234-5678"
              onChange={(e) => setPhone(e.target.value)}
            />
            <Button className="w-full" type="submit" disabled={!name || !phone}>
              찾기
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
