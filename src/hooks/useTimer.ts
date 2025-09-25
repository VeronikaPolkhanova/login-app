import { useEffect, useState } from "react";

const useTimer = () => {
  const [timeLeft, setTimeLeft] = useState(45);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  return { timeLeft, setTimeLeft };
};

export default useTimer;
