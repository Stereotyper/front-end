import { useEffect, useState } from "react";

const getTime = () => {
  return new Date().getTime();
};

export const useTime = (refresh = 100) => {
  const [now, setNow] = useState(getTime());

  useEffect(() => {
    const interval = setInterval(() => setNow(getTime()), refresh);

    return () => clearInterval(interval);
  }, [refresh, setInterval, clearInterval, setNow, getTime]);

  return now;
};
