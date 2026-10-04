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

export default function RegisterTributeDialog({
  token,
  isOpen,
  setIsOpen,
}: {
  token?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [visibility, setVisibility] = useState();
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>추모글 등록</DialogTitle>
          <DialogDescription>추모글을 작성해주세요.</DialogDescription>
        </DialogHeader>
        <Form>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tribute">추모글</Label>
              <Textarea id="tribute" rows={10} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="visibility">공개 설정</Label>
              <Select></Select>
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
            <Button type="submit">등록</Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
