import { Face } from "../constants/face";

interface Dice {
  faces: Face[];
  selected?: Face;
  life: number;
  icon?: string;
}

interface DiceBox {
  dices: Dice[];
}

export type { DiceBox, Dice }
