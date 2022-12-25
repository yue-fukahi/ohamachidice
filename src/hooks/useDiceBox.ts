import * as _ from "lodash";
import { useState } from "react"
import { Dice, DiceBox } from "../models/diceBox"

const useDiceBox = (initialDiceBox: DiceBox) => {
  const [diceBox, setDiceBox] = useState(initialDiceBox);
  const [defaultSize] = useState(initialDiceBox.dices.length);

  const roll = (diceBox: DiceBox, i: number) => {
    const dice = diceBox.dices[i];
    const x = _.random(dice.faces.length - 1);
    const newDices = diceBox.dices.slice();
    newDices[i] = { ...dice, selected: dice.faces[x] };
    setDiceBox({ dices: newDices });
    return { dices: newDices };
  }

  const reset = () => {
    const newDices = diceBox.dices.map((d) => ({ ...d, selected: undefined }))
    setDiceBox({ dices: newDices });
    return { dices: newDices };
  };

  const push = (diceBox: DiceBox, newDice: Dice) => {
    const box = { dices: [...diceBox.dices, newDice] }
    setDiceBox(box);
    return box
  }

  const pop = (diceBox: DiceBox) => {
    if (diceBox.dices.length > defaultSize) {
      diceBox.dices.pop();
      const box = { dices: diceBox.dices }
      setDiceBox(box);
      return box
    }
    return diceBox;
  }

  return { diceBox, roll, push, pop, reset }
}


export { useDiceBox }
