import { useState } from "react";
import { CharacteristicKeys, CharacteristicValues } from "de1";

export type Characteristics<K extends CharacteristicKeys> = Record<
  K,
  CharacteristicValues<K>
>;
export type CharacteristicsSetter<
  T extends CharacteristicKeys
> = React.Dispatch<React.SetStateAction<Characteristics<T>>>;

export default function useDe1Characteristics<T extends CharacteristicKeys>(
  ...names: T[]
): [Characteristics<T>, CharacteristicsSetter<T>] {
  const initialChcrs = getInitialCharacteristics(names);
  const [characteristics, setCharacteristics] = useState(initialChcrs);

  return [characteristics, setCharacteristics];
}

function getInitialCharacteristics<T extends CharacteristicKeys>(
  names: T[]
): Characteristics<T> {
  return names.reduce<Characteristics<T>>(
    (characteristics, name) => ({ ...characteristics, [name]: undefined }),
    {} as Characteristics<T>
  );
}
