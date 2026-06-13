import { useState } from "react";
import { Button } from "../ui/button";
import FlexDiv from "../FlexDiv";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

export default function Guides() {
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const onClick = () => {
    if (step === 3) {
      navigate("/", { replace: true });
    } else {
      setStep(step + 1);
    }
  }

  return (
    <FlexDiv className="h-full justify-center bg-linear-to-br from-purple-600 to-blue-600">
      <FlexDiv className="static md:relative items-center w-full md:max-w-1/2 h-full bg-white">
        <motion.div
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="px-4"
        >
          {step === 1 ? (
            <>
              <h3 className="mb-3">회원가입 및 로그인</h3>
              <p className="text-gray-600 text-sm mb-2">
                이메일 또는 소셜 계정(카카오, 네이버)으로 간편하게 가입할 수 있습니다.
              </p>
            </>
          ) : step === 2 ? (
            <>
              <h3 className="mb-3">가족 그룹을 만들거나 참여하세요</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                <li>가족 그룹이 없는 경우 가족 그룹을 생성하여 가족들을 초대하세요</li>
                <li>가족 그룹이 있는 경우 가족 그룹에 참여하세요</li>
              </ul>
            </>
          ) : (
            <>
              <h3 className="mb-3">추모관 이용하기</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                  <li>고인 검색: 이름, 생년월일로 추모관을 찾을 수 있습니다</li>
                  <li>온라인 성묘: 헌화, 분향, 헌촛을 할 수 있습니다</li>
                  <li>추모글 남기기: 공개 또는 비공개로 추모글을 작성할 수 있습니다</li>
              </ul>
            </>
          )}
        </motion.div>
        <Button
          className="fixed md:absolute bottom-4 right-4"
          onClick={onClick}
        >
          {step < 3 ? (
            "다음"
          ) : (
            "확인"
          )}
        </Button>
      </FlexDiv>
    </FlexDiv>
  )
}