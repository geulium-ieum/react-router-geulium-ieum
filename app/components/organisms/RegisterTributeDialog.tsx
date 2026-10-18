import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Form } from "react-router";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useState } from "react";

export interface ReigsterTribute {
  content: string;
  isPublic: boolean;
}

export default function RegisterTributeDialog({
  token,
  isOpen,
  setIsOpen,
}: {
  token?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [registerTribute, setRegisterTribute] = useState<ReigsterTribute>({
    content: "",
    isPublic: true,
  });
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>추모글 등록</DialogTitle>
          <DialogDescription>추모글을 작성해주세요.</DialogDescription>
        </DialogHeader>
        <Form method="post">
          <input type="hidden" name="intent" value="createTribute" />
          <input type="hidden" name="content" value={registerTribute.content} />
          <input
            type="hidden"
            name="isPublic"
            value={String(registerTribute.isPublic)}
          />
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="content">
                추모글 <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="content"
                rows={10}
                value={registerTribute.content}
                onChange={(e) =>
                  setRegisterTribute((prev) => ({
                    ...prev,
                    content: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="visibility">
                공개 설정 <span className="text-red-500">*</span>
              </Label>
              <Select
                value={String(registerTribute.isPublic)}
                onValueChange={(value) =>
                  setRegisterTribute((prev) => ({
                    ...prev,
                    isPublic: value === "true",
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="공개 여부" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">공개</SelectItem>
                  <SelectItem value="false">비공개</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              취소
            </Button>
            <Button type="submit" onClick={() => setIsOpen(false)}>
              등록
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
