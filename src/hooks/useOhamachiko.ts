import * as _ from "lodash";
import { useState } from "react"
import { DiceBox } from "../models/diceBox"

const useOhamachiko = (initialDiceBox: DiceBox) => {
  const [diceBox, setDiceBox] = useState(initialDiceBox);
  const [disabled, setDisabled] = useState(false);

  const roll = (diceBox: DiceBox, i: number) => {
    const dice = diceBox.dices[i];
    const x = _.random(dice.faces.length - 1);
    const newDices = diceBox.dices.slice();
    newDices[i] = { ...dice, selected: dice.faces[x] };
    setDiceBox({ dices: newDices });
    return { dices: newDices };
  }

  const reset = () => {
    return new Promise<DiceBox>((resolve) => {
      setDisabled(true);
      const newDices = diceBox.dices.map((d) => ({ ...d, selected: undefined }))
      setDiceBox({ dices: newDices });
      resolve({ dices: newDices });
    });
  };

  return { diceBox, roll, reset }
}


export { useOhamachiko }
