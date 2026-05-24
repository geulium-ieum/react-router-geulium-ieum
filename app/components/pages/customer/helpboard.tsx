import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import { Button } from '~/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '~/components/ui/select';
import { useState } from 'react';
import { Input } from '~/components/ui/input';
import { Card } from '~/components/ui/card';

export default function OneOnOneInquiry() {
    const [inquiryType, setInquiryType] = useState<string | undefined>(undefined);
    const handleInquiryTypeChange = (value: string) => {
        setInquiryType(value);
    }

    return (
        <div
            className="bg-gray-50 max-w-7xl mx-auto"
        >
            <div 
                className="pt-4 mb-4"
            >
                <h1 
                    className="text-3xl text-gray-900"
                >
                    1:1 문의
                </h1>
            </div>
            <div className="flex flex-col gap-4">
              <Card
                className="p-6"
              >
                <Label 
                    htmlFor="inquiry-type"
                    className="text-gray-900 text-2xl"
                >
                    문의 유형
                </Label>
                <Select value={inquiryType} onValueChange={handleInquiryTypeChange}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="문의 유형을 선택해주세요." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="account">계정</SelectItem>
                        <SelectItem value="memorial">추모관</SelectItem>
                        <SelectItem value="family-group">가족 그룹</SelectItem>
                        <SelectItem value="bug">오류</SelectItem>
                        <SelectItem value="feature">기능 요청</SelectItem>
                        <SelectItem value="other">기타</SelectItem>
                    </SelectContent>
                </Select>
                <Label 
                    htmlFor="inquiry-title"
                    className="text-gray-900 text-2xl"
                >
                    문의 제목
                </Label>
                <Input
                    id="inquiry-title"
                    placeholder="문의 제목을 입력해주세요."
                    className="text-gray-900 bg-white border-gray-500 rounded-md"
                />
                <Label 
                    htmlFor="inquiry-content"
                    className="text-gray-900 text-2xl"
                >
                    문의 내용
                </Label>
                <Textarea 
                    id="inquiry-content" 
                    placeholder="문의 내용을 입력해주세요."
                    className="text-gray-900 bg-white border-gray-500 rounded-md"
                />
                <div className="flex justify-end gap-4">
                    <Button
                        className="bg-primary text-white hover:bg-primary/90"
                    >
                            등록하기
                     </Button>
                     <Button
                        variant="outline"
                        className="bg-white text-gray-900 hover:bg-gray-100"
                     >
                        취소
                     </Button>
                </div>
                </Card>
            </div>
        </div>
    );
}