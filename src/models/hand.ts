import { HandName } from "../constants/handName";
import { Face } from "../constants/face";

interface Hand {
  name: HandName;
  icon: string;
  units: [Face, number][];
  life: number;
  extraDice?: boolean;
}

export type { Hand }
