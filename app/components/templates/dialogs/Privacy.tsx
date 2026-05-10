import type { FooterDialogProps } from "~/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~/components/ui/dialog";

export default function PrivacyDialog({ open, onOpenChange }: FooterDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>개인정보처리방침</DialogTitle>
                    <DialogDescription>그리움 이음의 개인정보 처리 방침입니다</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 text-sm text-gray-700">
                    <div>
                        <h3 className="mb-2">1. 개인정보의 수집 및 이용 목적</h3>
                        <p>
                            회사는 다음의 목적을 위하여 개인정보를 처리합니다:<br />
                            - 회원 가입 및 관리<br />
                            - 서비스 제공 및 개선<br />
                            - 고객 문의 응대<br />
                            - 서비스 관련 공지사항 전달
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-2">2. 수집하는 개인정보 항목</h3>
                        <p>
                            - 필수항목: 이름, 이메일, 비밀번호<br />
                            - 선택항목: 휴대폰 번호, 프로필 사진
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-2">3. 개인정보의 보유 및 이용기간</h3>
                        <p>
                            회원 탈퇴 시까지 보유하며, 관련 법령에 따라 일정 기간 보관할 수 있습니다.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-2">4. 개인정보의 안전성 확보조치</h3>
                        <p>
                            회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:<br />
                            - 개인정보 암호화<br />
                            - 해킹 등에 대비한 기술적 대책<br />
                            - 접근 권한 관리
                        </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-6">
                        * 전체 개인정보처리방침은 개발 중이며, 정식 서비스 시 제공됩니다.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}
