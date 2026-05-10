import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import type { FooterDialogProps } from "~/types";

export default function TermsDialog({ open, onOpenChange }: FooterDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>이용약관</DialogTitle>
                    <DialogDescription>그리움 이음 서비스 이용약관입니다</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 text-sm text-gray-700">
                    <div>
                        <h3 className="mb-2">제1조 (목적)</h3>
                        <p>
                            본 약관은 그리움 이음(이하 "회사")이 제공하는 온라인 추모 서비스의 이용과
                            관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-2">제2조 (정의)</h3>
                        <p>
                            1. "서비스"란 온라인 추모관 운영 및 관련 부가서비스를 말합니다.<br />
                            2. "회원"이란 본 약관에 동의하고 회사와 서비스 이용계약을 체결한 자를 말합니다.<br />
                            3. "추모관"이란 고인을 추모하기 위한 온라인 공간을 말합니다.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-2">제3조 (서비스 이용)</h3>
                        <p>
                            1. 회원은 본 약관과 관련 법령을 준수하여야 합니다.<br />
                            2. 회사는 관련 법령이 정하는 바에 따라 서비스를 제공합니다.<br />
                            3. 회원은 타인의 명예를 훼손하거나 부적절한 콘텐츠를 게시해서는 안 됩니다.
                        </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-6">
                        * 전체 약관 내용은 개발 중이며, 정식 서비스 시 제공됩니다.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}