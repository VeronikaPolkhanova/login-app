import { useRef } from "react";

type CodeInputProps = {
  value: string[];
  onChange: (newCode: string[]) => void;
  error?: boolean;
};

const CodeInput = ({ value, onChange, error }: CodeInputProps) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const borderRule = error ? "border-red-300" : "border-gray-300";

  const handleChange = (val: string, index: number) => {
    if (/^\d?$/.test(val)) {
      const newCode = [...value];
      newCode[index] = val;
      onChange(newCode);

      if (val && index < value.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-between mb-4">
      {value.map((digit, index) => (
        <input
          key={index}
          ref={(el: HTMLInputElement | null) => {
            inputsRef.current[index] = el;
          }}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={`w-[52px] h-[60px] text-center border ${borderRule} rounded-md focus:ring-2 focus:ring-blue-500 text-lg`}
        />
      ))}
    </div>
  );
};

export default CodeInput;
