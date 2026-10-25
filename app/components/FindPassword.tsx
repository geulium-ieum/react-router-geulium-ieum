import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export default function FindPassword() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle>비밀번호 재설정</CardTitle>
        </CardHeader>
        <CardContent>
          <Input className="mb-2" type="email" placeholder="이메일 주소" />
          <Button className="w-full" type="submit">
            인증 요청
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
