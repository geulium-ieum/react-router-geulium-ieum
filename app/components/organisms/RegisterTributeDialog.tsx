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

export default function RegisterTributeDialog({ isOpen, setIsOpen }) {
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
              <Textarea id="tribute" rows={5} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="visibility">공개 설정</Label>
              <Select></Select>
            </div>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
