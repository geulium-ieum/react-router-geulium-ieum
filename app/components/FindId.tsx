import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export default function FindId() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle>아이디 찾기</CardTitle>
        </CardHeader>
        <CardContent>
          <Input className="mb-2" type="text" placeholder="이름" />
          <Input className="mb-2" type="tel" placeholder="전화번호" />
          <Button className="w-full" type="submit">
            찾기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
