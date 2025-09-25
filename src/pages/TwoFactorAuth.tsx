import { useEffect, useState } from "react";

import { ArrowLeft } from "lucide-react";

import Logo from "../components/Logo";
import Page from "../components/Page";
import useTimer from "../hooks/useTimer";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import confetti from "canvas-confetti";

const TwoFactorAuth = () => {
  const [code, setCode] = useState(Array(6).fill(""));
  const { verifyMutation } = useAuth();

  const { setStep } = useAuth();
  const { timeLeft, setTimeLeft } = useTimer();

  const borderRule = verifyMutation.isError
    ? "border-red-300"
    : "border-gray-300";

  const handleVerify = () => {
    verifyMutation.mutate({ code: code.join("") });
  };

  const handleChange = (value: string, index: number) => {
    verifyMutation.reset();
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        (nextInput as HTMLInputElement)?.focus();
      }
    }
  };

  const renderAction = () => {
    if (verifyMutation.isError) {
      return <Button disabled>Continue</Button>;
    }

    if (timeLeft === 0 && !verifyMutation.isSuccess) {
      return <Button onClick={handleRequestCode}>Request a new code</Button>;
    }

    const isFilled = code.every((digit) => digit !== "");
    if (isFilled) {
      return (
        <Button
          onClick={handleVerify}
          disabled={
            code.length < 6 ||
            verifyMutation.isPending ||
            verifyMutation.isSuccess
          }
        >
          Verify
        </Button>
      );
    }

    return (
      <p className="text-center text-sm text-gray-500">{`Get a new code in 00:${timeLeft
        .toString()
        .padStart(2, "0")}`}</p>
    );
  };

  const handleBack = () => {
    setStep("login");
  };

  const handleRequestCode = () => {
    setTimeLeft(45);
  };

  useEffect(() => {
    if (verifyMutation.isSuccess) {
      confetti({
        particleCount: 200,
        spread: 60,
      });
    }
  }, [verifyMutation.isSuccess]);

  return (
    <Page>
      <Button className="ml-2.5 mt-2" variant="icon" onClick={handleBack}>
        <ArrowLeft className="w-5 h-5" />
      </Button>
      <Logo className="pb-6" />
      <h1 className="text-2xl m-1 font-semibold text-center">
        Two-Factor Authentication
      </h1>
      <p className="text-m text-black text-center mb-6">
        Enter the 6-digit code from the Google Authenticator app
      </p>
      <div className="flex justify-between mb-4">
        {code.map((digit, index) => (
          <input
            key={index}
            id={`code-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            className={`w-[52px] h-[60px] text-center border ${borderRule} rounded-md focus:ring-2 focus:ring-blue-500 text-lg`}
          />
        ))}
      </div>
      {verifyMutation.isError && (
        <p className="text-red-500 mb-4 text-sm">
          {(verifyMutation.error as any).message || "Verification failed"}
        </p>
      )}
      {verifyMutation.isSuccess && (
        <p className="text-blue-500 mb-4 text-sm">
          {(verifyMutation.data as any).message || "Success!"}
        </p>
      )}
      <div className="flex justify-center">{renderAction()}</div>
    </Page>
  );
};

export default TwoFactorAuth;
