import { Box, Container, Grid, Stack, useMediaQuery } from "@mui/material";
import * as _ from "lodash";
import type { NextPage } from "next";
import * as React from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { OhamachiButton } from "../components/atoms/ohamachiButton";
import { Title } from "../components/atoms/title";
import { Dice, DiceProps } from "../components/molecules/dice";
import { Face } from "../constants/face";
import { HandList } from "../constants/handList";
import { useOhamachiko } from "../hooks/useOhamachiko";
import { DiceBox } from "../models/diceBox";
import { Hand } from "../models/hand";

const DiceBox = () => {
  const [disabled, setDisabled] = useState(false);

  const countFace = (map: Map<Face, number>, face: Face) => map.get(face) || 0;

  const buildHand = (diceBox: DiceBox) => {
    const cnt = diceBox.dices
      .map((dice) => dice.selected)
      .filter((face): face is Face => face !== undefined)
      .reduce((map, face) => {
        const v: number = map.get(face) || 0;
        return map.set(face, v + 1);
      }, new Map<Face, number>());

    return HandList.map((hand) => {
      // Not match but much !!!
      const muches = hand.units.map(([face, num]: [Face, number]) => {
        return Math.floor(countFace(cnt, face) / num);
      });

      return _.fill(_.range(_.min(muches) || 0), hand);
    }).flat();
  };

  const notify = (hands: Hand[], hand: Hand) => {
    return new Promise<Hand[]>((resolve) => {
      setTimeout(() => {
        const { name, icon } = hand;
        toast.success(name, {
          icon: icon,
          duration: 5000,
          style: {
            fontSize: "250%",
            fontWeight: "200",
          },
        });
        resolve(hands);
      }, 200);
    });
  };

  const defaultDices: DiceBox = {
    dices: [
      { faces: [Face.O, Face.Ha, Face.Ma, Face.Chi, Face.Ko, Face.O] },
      { faces: [Face.O, Face.Ha, Face.Ma, Face.Chi, Face.Ko, Face.Ha] },
      { faces: [Face.O, Face.Ha, Face.Ma, Face.Chi, Face.Ko, Face.Ma] },
      { faces: [Face.O, Face.Ha, Face.Ma, Face.Chi, Face.Ko, Face.Chi] },
      { faces: [Face.O, Face.Ha, Face.Ma, Face.Chi, Face.Ko, Face.Ko] },
    ],
  };

  const { diceBox, roll, reset } = useOhamachiko(defaultDices);

  const handleOnClick = () => {
    Promise.resolve()
      .then(() =>
        _.shuffle(_.range(diceBox.dices.length)).reduce(
          (promise, i) => promise.then((d: DiceBox) => roll(d, i)),
          Promise.resolve().then(reset)
        )
      )
      .then((d) => {
        const hands = buildHand(d);
        hands
          .reduce(
            (promise, hand) =>
              promise.then((hands: Hand[]) => notify(hands, hand)),
            Promise.resolve().then(() => hands)
          )
          .then(() => {
            // setDisabled(false);
            // setCount(count + 1);
          });
      });
  };

  const matches: boolean = useMediaQuery("(min-width:640px)");
  const diceSize = matches ? "160px" : "80px";

  return (
    <Stack
      spacing={3}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        width: "100%",
        p: 2,
        bgcolor: "background.paper",
        borderRadius: 3,
        border: "1px solid #1C78D3",
      }}
    >
      <Box>
        <Title />
      </Box>
      <Grid container justifyContent="center" alignItems="center">
        {diceBox.dices.map((dice, i) => (
          <Grid item key={i} xs>
            <Dice {...dice} size={diceSize} />
          </Grid>
        ))}
      </Grid>
      <Box>
        <OhamachiButton disabled={disabled} onClick={handleOnClick} />
      </Box>
    </Stack>
  );
};

const Home: NextPage = () => {
  const VerticalHorizontalCenter = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <React.Fragment>
      <Toaster />
      <Container
        sx={{
          ...VerticalHorizontalCenter,
          width: "100%",
          height: "100vh",
        }}
      >
        <DiceBox />
      </Container>
    </React.Fragment>
  );
};

export default Home;
