import { Container, Box, Grid } from "@mui/material";
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
}

const Dice = (props: DiceProps) => {
  const [faces, _] = useState<Face[]>(props.faces);
  const [face, setFace] = useState<Face | undefined>();

  const size = faces.length;

  const roll = () => random(size);

  const handleOnClick = () => {
    if (face === undefined) {
      const i = roll();
      setFace(faces[i]);
    }
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "skyblue",
      }}
      onClick={handleOnClick}
    >
      {face !== undefined ? (
        <Image src={toSrc(face)} alt={face} height="150" width="150" />
      ) : (
        <Image src="/empty.svg" alt="empty" height="150" width="150" />
      )}
    </div>
  );
};

const DiceBox = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Dice faces={[Face.O, Face.Ha, Face.Ma, Face.Chi, Face.Ko, Face.O]} />
        </Grid>
        <Grid item xs={4}>
          <Dice
            faces={[Face.O, Face.Ha, Face.Ma, Face.Chi, Face.Ko, Face.Ha]}
          />
        </Grid>
        <Grid item xs={4}>
          <Dice
            faces={[Face.O, Face.Ha, Face.Ma, Face.Chi, Face.Ko, Face.Ma]}
          />
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
          <Dice
            faces={[Face.O, Face.Ha, Face.Ma, Face.Chi, Face.Ko, Face.Chi]}
          />
        </Grid>
        <Grid item xs={4}>
          <Dice
            faces={[Face.O, Face.Ha, Face.Ma, Face.Chi, Face.Ko, Face.Ko]}
          />
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
