import { useState } from "react";
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
  read(names, setCharacteristics);
  sub(names, setCharacteristics);
  return [characteristics, setCharacteristics];
}

function init<T extends Keys>(names: T[]): Characteristics<T> {
  const initChrcs = {} as Characteristics<T>;
  return names.reduce((chcrs, n) => ({ ...chcrs, [n]: undefined }), initChrcs);
}

async function read<T extends Keys>(names: T[], set: CharacteristicsSetter<T>) {
  for (const name of names) {
    set({ [name]: await de1.get(name) } as Characteristics<T>); // TODO why is there a typecast neccessary
  }
}

async function sub<T extends Keys>(names: T[], set: CharacteristicsSetter<T>) {
  for (const name of names) {
    de1.on(name, value => set({ [name]: value } as Characteristics<T>)); // TODO why is there a typecast neccessary
  }
}
