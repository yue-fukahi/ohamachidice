import { Face } from "../constants/face";

interface Dice {
  faces: Face[];
  selected?: Face;
}

interface DiceBox {
  dices: Dice[];
}

export type { DiceBox }
