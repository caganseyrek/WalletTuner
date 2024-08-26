import { EffectCallback, useEffect } from "react";

const useOnMountEffect = (effect: EffectCallback): void => {
  return useEffect(effect, []);
};

export default useOnMountEffect;
