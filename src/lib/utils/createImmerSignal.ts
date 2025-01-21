import { produce } from "immer";
import { Accessor, createSignal, SignalOptions } from "solid-js";

type ImmerUpdater<T> = (draft: T) => void;
type ImmerSignal<T> = [
  get: Accessor<T>,
  produce: (updater: ImmerUpdater<T>) => T
];

export const createImmerSignal = <T>(
  initialValue: T,
  options?: SignalOptions<T>
): ImmerSignal<T> => {
  const [getSignal, setSignal] = createSignal<T>(initialValue, options);

  const immerSetter = (updater: ImmerUpdater<T>) => {
    const curriedProduce = produce((draft: T) => {
      updater(draft);
    }) as (value: T) => T;
    return setSignal(curriedProduce);
  };

  return [getSignal, immerSetter];
};
