import * as _ from "lodash";
import { useState } from "react";
import { Face } from "../constants/face";
import { HandList } from "../constants/handList";
import { DiceBox } from "../models/diceBox";


const useRoleCalculation = (initRoles = HandList) => {
  const [roles] = useState(initRoles)

  const countFace = (map: Map<Face, number>, face: Face) => map.get(face) || 0;

  const roleCalc = (diceBox: DiceBox) => {
    const cnt = diceBox.dices
      .map((dice) => dice.selected)
      .filter((face): face is Face => face !== undefined)
      .reduce((map, face) => {
        const v: number = map.get(face) || 0;
        return map.set(face, v + 1);
      }, new Map<Face, number>());

    return roles.map((hand) => {
      // Not match but much !!!
      const muches = hand.units.map(([face, num]: [Face, number]) => {
        return Math.floor(countFace(cnt, face) / num);
      });

      return _.fill(_.range(_.min(muches) || 0), hand);
    }).flat();
  }

  return { roleCalc }
}

export { useRoleCalculation }
