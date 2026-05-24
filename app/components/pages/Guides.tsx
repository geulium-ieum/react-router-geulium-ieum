import { useState } from "react";
import { Button } from "../ui/button";

export default function Guides() {
  const [step, setStep] = useState(1);

  const onClick = () => {
    setStep(step + 1);
  }

  return (
    <div>
      <Button
        className="fixed bottom-4 right-4"
        onClick={onClick}
      >
        {step < 4 ? (
          "다음"
        ) : (
          "확인"
        )}
      </Button>
    </div>
  )
}