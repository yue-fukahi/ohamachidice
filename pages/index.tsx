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

interface Face {
  key: string;
  alt: string;
  src: string;
}

const FACE_DATA: Face[] = [
  { key: "o", alt: "お", src: "/o.svg" },
  { key: "ha", alt: "は", src: "/ha.svg" },
  { key: "ma", alt: "ま", src: "/ma.svg" },
  { key: "chi", alt: "ち", src: "/chi.svg" },
  { key: "ko", alt: "こ", src: "/ko.svg" },
];

const Dice = (props: { children: React.ReactNode }) => {
  const [face, setFace] = useState<Face | undefined>();

  const faces = [
    FACE_DATA[0],
    FACE_DATA[1],
    FACE_DATA[2],
    FACE_DATA[3],
    FACE_DATA[4],
    FACE_DATA[0],
  ];
  const size = faces.length;

  const roll = () => random(size);

  const handleOnClick = () => {
    if (face === undefined) {
      const i = roll();
      setFace(faces[i]);
    }
    console.log(face);
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "mintcream",
      }}
      onClick={handleOnClick}
    >
      {face !== undefined ? (
        <Image src={face.src} alt={face.alt} height="100%" width="100%" />
      ) : (
        <Image src="/empty.svg" alt="empty" height="100%" width="100%" />
      )}
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
