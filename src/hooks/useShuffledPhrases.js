import { useMemo } from "react";

export const useShuffledPhrases = (phrases) => {
  return useMemo(() => [...phrases].sort(() => 0.5 - Math.random()), [phrases]);
};