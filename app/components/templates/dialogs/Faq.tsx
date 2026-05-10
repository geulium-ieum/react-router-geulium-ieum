import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import type { FooterDialogProps } from "~/types";

const content = [
    {
        question: "Q. 추모관은 어떻게 만드나요?",
        answer: "로그인 후 '고인 검색' 메뉴에서 '새 추모관 등록' 버튼을 클릭하여 추모관을 생성할 수 있습니다. 관리자 승인 후 이용 가능합니다."
    },
    {
        question: "Q. 추모관은 무료인가요?",
        answer: "기본 추모관은 무료로 제공됩니다. 프리미엄 기능(확장 저장공간, 특별 템플릿)은 유료입니다."
    },
    {
        question: "Q. 가족 그룹은 어떻게 사용하나요?",
        answer: "가족 그룹' 메뉴에서 새 그룹을 만들고 가족 구성원을 초대할 수 있습니다. 그룹 멤버들은 함께 추모관을 관리하고 추억을 공유할 수 있습니다."
    },
    {
        question: "Q. 비공개 추모글은 누가 볼 수 있나요?",
        answer: "비공개로 설정한 추모글은 본인과 해당 추모관의 가족 그룹 관리자만 볼 수 있습니다."
    }
]

export default function FaqDialog({ open, onOpenChange }: FooterDialogProps) {
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>자주 묻는 질문</DialogTitle>
                    <DialogDescription>그리움 이음 서비스 이용 시 자주 묻는 질문들입니다</DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                    {content.map((item, index) => (
                        <div key={index}>
                            <h3 className="mb-2">{item.question}</h3>
                            <p className="text-gray-600 text-sm">
                                {item.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}
