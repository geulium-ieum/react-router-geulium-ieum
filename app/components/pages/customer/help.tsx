import { Card } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';

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

export default function Help() {
    const [search, setSearch] = useState('');
    const [filteredContent, setFilteredContent] = useState(content);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value.toLowerCase();
        setSearch(e.target.value);
        setFilteredContent(
            content.filter((item) => 
                item.question.toLowerCase().includes(searchValue) ||
                item.answer.toLowerCase().includes(searchValue)
            )
        );
    }

    return (
        <div
            className="bg-gray-50 max-w-7xl mx-auto"
        >
            <div className="pt-4 mb-4">
                <h1 className="text-3xl text-gray-900">
                    고객센터
                </h1>
            </div>
            <div className="max-w-7xl mx-auto flex items-center gap-2 mb-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="검색어를 입력해주세요."
                        value={search}
                        onChange={handleSearch}
                        className="pl-10"
                    />
                </div>
                {search && (
                    <Button
                        onClick={() => {
                            setSearch('');
                            setFilteredContent(content);
                        }}
                        variant="outline"
                    >
                        초기화
                    </Button>
                )}
            </div>
            <div className="flex flex-col gap-4">
                <Card 
                    className="p-6"
                >
                    <h2 className="text-lg font-bold">
                        자주 묻는 질문
                    </h2>
                    <p className="text-gray-600 text-sm">
                        그리움 이음 서비스 이용 시 자주 묻는 질문들입니다
                    </p>
                    <div className="space-y-6">
                        {filteredContent.length > 0 ? (
                            filteredContent.map((item, index) => (
                                <div key={index}>
                                    <h3 className="mb-2">{item.question}</h3>
                                    <p className="text-gray-600 text-sm">
                                        {item.answer}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                검색 결과가 없습니다.
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    )
}