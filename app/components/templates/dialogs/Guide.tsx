import type { FooterDialogProps } from "~/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";

export default function GuideDialog({ open, onOpenChange }: FooterDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>이용 가이드</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    <div>
                        <h3 className="mb-3">1. 회원가입 및 로그인</h3>
                        <p className="text-gray-600 text-sm mb-2">
                            이메일 또는 소셜 계정(카카오, 네이버)으로 간편하게 가입할 수 있습니다.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-3">2. 추모관 이용하기</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                            <li>고인 검색: 이름, 생년월일로 추모관을 찾을 수 있습니다</li>
                            <li>온라인 성묘: 헌화, 분향, 헌촛을 할 수 있습니다</li>
                            <li>추모글 남기기: 공개 또는 비공개로 추모글을 작성할 수 있습니다</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-3">3. 가족 그룹 만들기</h3>
                        <p className="text-gray-600 text-sm">
                            가족 그룹을 만들어 구성원들과 함께 추모관을 관리하고 추억을 공유하세요.
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}