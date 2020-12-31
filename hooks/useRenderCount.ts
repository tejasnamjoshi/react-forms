import { useEffect, useRef } from "react";

const useRenderCount = () => {
  const countRef = useRef(1);
  useEffect(() => {
    countRef.current += 1;
  });

  const resetCount = () => (countRef.current = 1);

  return { count: countRef.current, resetCount };
};

export default useRenderCount;
