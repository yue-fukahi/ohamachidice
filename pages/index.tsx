import { Container, Box, Grid, Button, selectClasses } from "@mui/material";
import type { NextPage } from "next";
import * as React from "react";
import { useEffect, useState } from "react";
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

const HandName = {
  Ohamachiko: "OHAMACHIKO",
  Hakomachiko: "HAKOMACHIKO",
  Machiko: "MACHIKO",
  MaoMao: "MAOMAO",
  Hamachi: "HAMACHI",
} as const;
type HandName = typeof HandName[keyof typeof HandName];

interface Hand {
  name: HandName;
  units: [Face, number][];
}

const HandList: Hand[] = [
  {
    name: HandName.Ohamachiko,
    units: [
      [Face.O, 1],
      [Face.Ha, 1],
      [Face.Ma, 1],
      [Face.Chi, 1],
      [Face.Ko, 1],
    ],
  },
  {
    name: HandName.Hakomachiko,
    units: [
      [Face.Ha, 1],
      [Face.Ma, 1],
      [Face.Chi, 1],
      [Face.Ko, 2],
    ],
  },
  {
    name: HandName.Machiko,
    units: [
      [Face.Ma, 1],
      [Face.Chi, 1],
      [Face.Ko, 1],
    ],
  },
  {
    name: HandName.MaoMao,
    units: [
      [Face.Ma, 2],
      [Face.O, 2],
    ],
  },
  {
    name: HandName.Hamachi,
    units: [
      [Face.Ha, 1],
      [Face.Ma, 1],
      [Face.Chi, 1],
    ],
  },
];

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

  const [dice0, setDice0] = useState<DiceProps>(defaultDices[0]);
  const [dice1, setDice1] = useState<DiceProps>(defaultDices[1]);
  const [dice2, setDice2] = useState<DiceProps>(defaultDices[2]);
  const [dice3, setDice3] = useState<DiceProps>(defaultDices[3]);
  const [dice4, setDice4] = useState<DiceProps>(defaultDices[4]);
  const [disabled, setDisabled] = useState(false);

  const reset = () => {
    [setDice0, setDice1, setDice2, setDice3, setDice4].forEach((setDice, i) => {
      setDice(defaultDices[i]);
    });
  };

  const roll = (
    dice: DiceProps,
    setDice: (props: DiceProps) => void,
    ms: number
  ) => {
    return new Promise<Face>((resolve) => {
      setTimeout(() => {
        const i = random(dice.faces.length);
        setDice({ ...dice, selected: dice.faces[i] });
        resolve(dice.faces[i]);
      }, ms);
    });
  };

  const counts = (map: Map<Face, number>, face: Face) => map.get(face) || 0;

  const buildHand = (faces: Face[]) => {
    const cnt = faces.reduce((map, face: Face) => {
      const v = map.get(face) || 0;
      return map.set(face, v + 1);
    }, new Map<Face, number>());

    const much = HandList.find((hand) => {
      // Not match but much !!!
      const much = hand.units.reduce((much, unit: [Face, number]) => {
        const [face, num] = unit;
        return much && counts(cnt, face) >= num;
      }, true);

      return much;
    });

    if (much) {
      console.log(much.name);
    }
  };

  const handleOnClick = () => {
    reset();
    setDisabled(true);

    Promise.all([
      roll(dice0, setDice0, 400 * 1),
      roll(dice1, setDice1, 400 * 2),
      roll(dice2, setDice2, 400 * 3),
      roll(dice3, setDice3, 400 * 4),
      roll(dice4, setDice4, 400 * 5),
    ]).then((values) => {
      buildHand(
        values.filter<Face>((face): face is Face => face !== undefined)
      );
      setDisabled(false);
    });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Dice {...dice0} />
        </Grid>
        <Grid item xs={4}>
          <Dice {...dice2} />
        </Grid>
        <Grid item xs={4}>
          <Dice {...dice4} />
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
          <Dice {...dice1} />
        </Grid>
        <Grid item xs={4}>
          <Dice {...dice3} />
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <Box sx={{ paddingTop: 3 }}>
        <Button
          variant="outlined"
          size="large"
          onClick={handleOnClick}
          disabled={disabled}
        >
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
