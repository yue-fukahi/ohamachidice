import { Container, Box, Grid } from "@mui/material";
import type { NextPage } from "next";
import * as React from "react";
import { useState } from "react";

const positionOpt = {
  display: "flex",
  flexWrap: "wrap",
  alignContent: "center",
  justifyContent: "center",
};

const random = () => Math.floor(Math.random() * 6);

const Dice = (props: { children: React.ReactNode }) => {
  const [face, setFace] = useState<number | undefined>();

  const faces = ["お", "は", "ま", "ち", "こ", "お"];
  var i: number | undefined = undefined;

  const roll = () => random();

  const handleOnClick = () => {
    setFace(roll());
  };

  return (
    <div style={{ height: "100%", width: "100%", backgroundColor: "mintcream" }} onClick={handleOnClick}>
      {face !== undefined ? `${face} ${faces[face]}` : `${face}`}
    </div>
  );
};

const DiceBox = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Dice>⚀</Dice>
        </Grid>
        <Grid item xs={4}>
          <Dice>⚀</Dice>
        </Grid>
        <Grid item xs={4}>
          <Dice>⚀</Dice>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
          <Dice>⚀</Dice>
        </Grid>
        <Grid item xs={4}>
          <Dice>⚀</Dice>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
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
