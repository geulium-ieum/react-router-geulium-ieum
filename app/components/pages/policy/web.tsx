import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export default function Web() {
    return (
        <div className="bg-gray-50 max-w-7xl mx-auto">
            <div className="flex flex-col gap-4">
                <div className="gap-2" />
                <Card
                    className="p-6"
                >
                    <CardHeader>
                        <CardTitle className="text-2xl text-gray-900 font-bold">
                            웹 접근성 정책
                        </CardTitle>
                        <CardDescription className="text-gray-600 text-sm">
                            그리움 이음 서비스 웹 접근성 정책입니다.
                        </CardDescription>
                    </CardHeader>
                    <CardContent
                        className="space-y-4 text-sm text-gray-700"
                    >
                        <div>
                            <h3 className="mb-2">접근성 준수</h3>
                            <p>
                                그리움 이음은 모든 사용자가 서비스를 원활하게 이용할 수 있도록
                                한국형 웹 콘텐츠 접근성 지침(KWCAG) 2.1을 준수하기 위해 노력하고 있습니다.
                            </p>
                        </div>
                        <div>
                            <h3 className="mb-2">주요 접근성 기능</h3>
                            <ul className="list-disc list-inside space-y-1">
                                <li>스크린 리더 호환성</li>
                                <li>키보드만으로 모든 기능 이용 가능</li>
                                <li>명확한 콘텐츠 구조 및 헤딩</li>
                                <li>충분한 색상 대비</li>
                                <li>반응형 디자인으로 다양한 기기 지원</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-2">접근성 개선 노력</h3>
                            <p>
                                저희는 지속적으로 서비스의 접근성을 개선하고 있습니다.
                                접근성 관련 문제를 발견하시면 고객센터로 문의해 주시기 바랍니다.
                            </p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p>
                                <strong>접근성 문의</strong><br />
                                이메일: accessibility@grieum.com
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}