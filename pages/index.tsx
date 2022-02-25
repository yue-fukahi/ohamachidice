import { Container, Box, Grid, Button, selectClasses } from "@mui/material";
import type { NextPage } from "next";
import * as React from "react";
import { useState } from "react";
import Image from "next/image";

const positionOpt = {
  display: "flex",
  flexWrap: "wrap",
  alignContent: "center",
  justifyContent: "center",
};

const random = (size: number) => Math.floor(Math.random() * size);

const Face = {
  O: "o",
  Ha: "ha",
  Ma: "ma",
  Chi: "chi",
  Ko: "ko",
} as const;
type Face = typeof Face[keyof typeof Face];

const toSrc = (f: Face) => `/${f}.svg`;
interface DiceProps {
  faces: Face[];
  selected?: Face;
}

const Dice = (props: DiceProps) => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "skyblue",
      }}
    >
      {props.selected ? (
        <Image
          src={toSrc(props.selected)}
          alt={props.selected}
          height="150"
          width="150"
        />
      ) : (
        <Image src="/empty.svg" alt="empty" height="150" width="150" />
      )}
    </div>
  );
};

const DiceBox = () => {
  const defaultDices: DiceProps[] = [
    { faces: [Face.O, Face.Ha, Face.Ma, Face.Chi, Face.Ko, Face.O] },
    { faces: [Face.O, Face.Ha, Face.Ma, Face.Chi, Face.Ko, Face.Ha] },
    { faces: [Face.O, Face.Ha, Face.Ma, Face.Chi, Face.Ko, Face.Ma] },
    { faces: [Face.O, Face.Ha, Face.Ma, Face.Chi, Face.Ko, Face.Chi] },
    { faces: [Face.O, Face.Ha, Face.Ma, Face.Chi, Face.Ko, Face.Ko] },
  ];

  const [dices, setDices] = useState(defaultDices);
  const [disabled, setDisabled] = useState(false);

  const roll = () => {
    setDices(defaultDices);
    setDisabled(true);

    setDices(
      dices.map((dice) => {
        const i = random(dice.faces.length);
        return { ...dice, selected: dice.faces[i] };
      })
    );

    setDisabled(false);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Dice {...dices[0]} />
        </Grid>
        <Grid item xs={4}>
          <Dice {...dices[1]} />
        </Grid>
        <Grid item xs={4}>
          <Dice {...dices[2]} />
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
          <Dice {...dices[3]} />
        </Grid>
        <Grid item xs={4}>
          <Dice {...dices[4]} />
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <Box sx={{ paddingTop: 3 }}>
        <Button variant="outlined" size="large" onClick={roll} disabled={disabled}>
          おはまちこする
        </Button>
      </Box>
    </>
  );
};

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <Container>
        <Box
          sx={{
            ...positionOpt,
            width: "100%",
            height: "100vh",
            bgcolor: "#cfe8fc",
          }}
        >
          <Box
            sx={{
              ...positionOpt,
              width: "100%",
              height: "60vh",
              p: 1,
              m: 1,
              bgcolor: "background.paper",
              borderRadius: 1,
            }}
          >
            <DiceBox />
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Home;
