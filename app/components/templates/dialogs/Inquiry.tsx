import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import type { FooterDialogProps } from "~/types";

export default function InquiryDialog({ open, onOpenChange }: FooterDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>1:1 문의</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-800">
                            <strong>고객센터 연락처</strong><br />
                            이메일: support@grieum.com<br />
                            전화: 1588-1234 (평일 09:00-18:00)<br />
                            카카오톡: @그리움이음
                        </p>
                    </div>
                    <p className="text-sm text-gray-600">
                        * 온라인 문의 양식은 개발 중입니다. 당분간 위 연락처로 문의해주시기 바랍니다.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}
