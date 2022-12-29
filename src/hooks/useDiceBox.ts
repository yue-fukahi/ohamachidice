import * as _ from "lodash";
import { useState } from "react"
import { Dice, DiceBox } from "../models/diceBox"
import { Hand } from "../models/hand";
import { useDiceMaker } from "./useDiceMaker";

const useDiceBox = (initialDiceBox: DiceBox) => {
  const [defaultDiceBox] = useState(initialDiceBox);
  const [diceBox, setDiceBox] = useState(initialDiceBox);
  const { makeDice } = useDiceMaker();

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

  const update = (diceBox: DiceBox, hands: Hand[]) => {
    const updated = diceBox.dices
      .map((dice: Dice) => ({
        ...dice,
        life: dice.life - 1,
      }))
      .filter((dice: Dice) => dice.life > 0);

    const newDices = hands.map((hand: Hand) =>
      makeDice([], hand.life, hand.icon)
    )

    const box = { dices: [...updated, ...newDices] };
    setDiceBox(box);
    return box;
  }

  const restart = () => {
    setDiceBox(defaultDiceBox);
  }

  return { diceBox, roll, update, reset, restart }
}


export { useDiceBox }
