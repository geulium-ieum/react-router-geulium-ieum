import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export default function Privacy() {
    return (
        <div className="bg-gray-50 max-w-7xl mx-auto">
            <div className="flex flex-col gap-4">
            <div className="gap-2" />
                <Card 
                    className="p-6"
                >
                    <CardHeader>
                        <CardTitle className="text-2xl text-gray-900 font-bold">
                            개인정보처리방침
                        </CardTitle>
                        <CardDescription className="text-gray-600 text-sm">
                            그리움 이음 서비스 개인정보처리방침입니다
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                   <div className="py-4">
                    <h3 className="mb-2">제1조 (목적)</h3>
                        <p>
                            본 약관은 그리움 이음(이하 "회사")이 제공하는 온라인 추모 서비스의 이용과
                            관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                        </p>
                    </div>
                    <div className="py-4">
                        <h3 className="mb-2">제2조 (정의)</h3>
                        <p>
                            1. "서비스"란 온라인 추모관 운영 및 관련 부가서비스를 말합니다.<br />
                            2. "회원"이란 본 약관에 동의하고 회사와 서비스 이용계약을 체결한 자를 말합니다.<br />
                            3. "추모관"이란 고인을 추모하기 위한 온라인 공간을 말합니다.
                        </p>
                    </div>
                    <div className="py-4">
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
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}