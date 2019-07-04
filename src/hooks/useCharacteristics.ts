import { useState, useEffect } from "react";
import de1, {
  CharacteristicKeys as Keys,
  CharacteristicValues as Values
} from "de1";

export type Characteristics<K extends Keys> = Record<K, Values<K>>;
export type CharacteristicsSetter<T extends Keys> = React.Dispatch<
  React.SetStateAction<Characteristics<T>>
>;

export default function useCharacteristics<T extends Keys>(
  ...names: T[]
): [Characteristics<T>, CharacteristicsSetter<T>] {
  const [characteristics, setCharacteristics] = useState(init(names));
  useEffect(() => {
    read(names, characteristics, setCharacteristics);
    sub(names, setCharacteristics);
  }, [names, characteristics, setCharacteristics]);
  return [characteristics, setCharacteristics];
}

function init<T extends Keys>(names: T[]): Characteristics<T> {
  const initChrcs = {} as Characteristics<T>;
  return names.reduce((chcrs, n) => ({ ...chcrs, [n]: undefined }), initChrcs);
}

async function read<T extends Keys>(
  names: T[],
  values: Characteristics<T>,
  set: CharacteristicsSetter<T>
) {
  try {
    if (!(await de1.isConnected())) return;
    for (const name of names) {
      const value = await de1.get(name);
      if (values[name] === undefined) {
        set(prev => ({ ...prev, [name]: value }));
      }
    }
  } catch (error) {
    console.error(error.message, error);
  }
}

async function sub<T extends Keys>(names: T[], set: CharacteristicsSetter<T>) {
  if (!(await de1.isConnected())) return;
  for (const name of names) {
    de1.on(name, value => set(prev => ({ ...prev, [name]: value })));
  }
}
