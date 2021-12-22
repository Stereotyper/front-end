import { useEffect, useState } from "react";

const getTime = () => {
  return new Date().getTime();
};

export const useTime = (refresh = 100) => {
  const [now, setNow] = useState();

  useEffect(() => {
    const interval = setInterval(() => setNow(), refresh);

    return () => clearInterval(interval);
  }, [refresh, setInterval, clearInterval, setNow, getTime]);
};
