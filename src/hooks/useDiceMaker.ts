import { Face } from "../constants/face";
import { Dice } from "../models/diceBox";

const useDiceMaker = (defaultFaces?: Face[]) => {
  const defaultDice = { faces: defaultFaces || Object.values(Face).filter(f => f != Face.Empty) }

  const makeDice = (additive: Face[] = []): Dice => {
    return {
      faces: [...defaultDice.faces, ...additive],
    }
  }

  return { makeDice }
}

export { useDiceMaker }
