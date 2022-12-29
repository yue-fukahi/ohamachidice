import { Face } from "../constants/face";
import { Dice } from "../models/diceBox";

const useDiceMaker = (defaultFaces?: Face[]) => {
  const defaultDice = { faces: defaultFaces || Object.values(Face).filter(f => f != Face.Empty) }

  const makeDice = (additive: Face[] = [], life?: number, icon?: string): Dice => {
    return {
      faces: [...defaultDice.faces, ...additive],
      life: life || 5,
      icon: icon || '',
    }
  }

  return { makeDice }
}

export { useDiceMaker }
