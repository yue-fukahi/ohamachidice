import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import * as _ from "lodash";
import * as React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Face } from "../../constants/face";
import { useDiceBox } from "../../hooks/useDiceBox";
import { useDiceMaker } from "../../hooks/useDiceMaker";
import { useRoleCalculation } from "../../hooks/useRoleCalculation";
import { DiceBox } from "../../models/diceBox";
import { Hand } from "../../models/hand";
import { OhamachiButton } from "../atoms/ohamachiButton";
import { Title } from "../atoms/title";
import { Dice } from "../molecules/dice";

const PlayFiled = () => {
  const [disabled, setDisabled] = useState(false);
  const [counts, setCounts] = useState(0);

  const { makeDice } = useDiceMaker();

  const defaultDices: DiceBox = {
    dices: [
      makeDice([Face.O]),
      makeDice([Face.Ha]),
      makeDice([Face.Ma]),
      makeDice([Face.Chi]),
      makeDice([Face.Ko]),
    ],
  };

  const { diceBox, roll, reset, update, restart } = useDiceBox(defaultDices);
  const { roleCalc } = useRoleCalculation();

  const notify = (hands: Hand[], hand: Hand) => {
    return new Promise<Hand[]>((resolve) => {
      setTimeout(() => {
        const { name, icon } = hand;
        toast(() => <Typography variant="h2">{`${icon} ${name}`}</Typography>);
        resolve(hands);
      }, 200);
    });
  };

  const handleOnRoll = (d: DiceBox, i: number) =>
    new Promise<DiceBox>((resolve) => {
      setTimeout(() => {
        resolve(roll(d, i));
      }, 250);
    });

  const handleOnReset = () =>
    new Promise<DiceBox>((resolve) => {
      setDisabled(true);
      resolve(reset());
    });

  const handleOnClick = () => {
    Promise.resolve()
      .then(() =>
        _.shuffle(_.range(diceBox.dices.length)).reduce(
          (promise, i) => promise.then((d: DiceBox) => handleOnRoll(d, i)),
          Promise.resolve().then(handleOnReset)
        )
      )
      .then((d) => {
        const hands = roleCalc(d);
        return hands
          .reduce(
            (promise, hand) =>
              promise.then((hands: Hand[]) => notify(hands, hand)),
            Promise.resolve().then(() => hands)
          )
          .then((x) => update(d, hands));
      })
      .then(() => {
        setDisabled(false);
        setCounts(counts + 1);
      });
  };

  const handleOnRestart = () => {
    restart();
    setCounts(0);
  };

  const matches: boolean = useMediaQuery("(min-width:640px)");
  const diceSize = matches ? "160px" : "80px";
  const isGameOver = diceBox.dices.length <= 0;

  const Content = () =>
    !isGameOver ? (
      <>
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
        <Box>OHAMACHI COUNTER: {counts}</Box>
      </>
    ) : (
      <>
        <Box
          sx={{
            backgroundColor: "primary.light",
            width: "100%",
            paddingY: "4px",
          }}
        >
          GAME OVER
        </Box>
        <Box>{counts}回おはまちこした！</Box>
        <Button variant="outlined" onClick={handleOnRestart}>
          もかもかもか！
        </Button>
      </>
    );

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
      <Content />
    </Stack>
  );
};

export { PlayFiled };
