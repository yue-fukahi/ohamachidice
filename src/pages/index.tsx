import { Container, Box, Grid, Button, Stack } from "@mui/material";
import * as _ from "lodash";
import type { NextPage } from "next";
import * as React from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Face, FaceImage } from "../components/faceImage";

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
  icon: string;
  units: [Face, number][];
}

const HandList: Hand[] = [
  {
    name: HandName.Ohamachiko,
    icon: "🐰",
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
    icon: "🐰",
    units: [
      [Face.Ha, 1],
      [Face.Ma, 1],
      [Face.Chi, 1],
      [Face.Ko, 2],
    ],
  },
  {
    name: HandName.Machiko,
    icon: "🐰",
    units: [
      [Face.Ma, 1],
      [Face.Chi, 1],
      [Face.Ko, 1],
    ],
  },
  {
    name: HandName.MaoMao,
    icon: "😺",
    units: [
      [Face.Ma, 2],
      [Face.O, 2],
    ],
  },
  {
    name: HandName.Hamachi,
    icon: "🐟",
    units: [
      [Face.Ha, 1],
      [Face.Ma, 1],
      [Face.Chi, 1],
    ],
  },
];

const Dice = (props: DiceProps) => {
  const imgStyle = {
    width: "100%",
    maxHeight: "150px",
  };

  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        p: 1,
      }}
    >
      <FaceImage face={props.selected} style={imgStyle} />
    </Box>
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
  const [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const reset = () => {
    return new Promise<DiceProps[]>((resolve) => {
      setDisabled(true);
      setDices(defaultDices);
      resolve(defaultDices);
    });
  };

  const roll = (dices: DiceProps[], i: number) => {
    return new Promise<DiceProps[]>((resolve) => {
      setTimeout(() => {
        const dice = dices[i];
        const x = _.random(dice.faces.length - 1);
        const newDices = dices.slice();
        newDices[i] = { ...dice, selected: dice.faces[x] };
        setDices(newDices);
        resolve(newDices);
      }, 250);
    });
  };

  const countFace = (map: Map<Face, number>, face: Face) => map.get(face) || 0;

  const buildHand = (dices: DiceProps[]) => {
    const cnt = dices
      .map((dice) => dice.selected)
      .filter((face): face is Face => face !== undefined)
      .reduce((map, face) => {
        const v = map.get(face) || 0;
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

  const handleOnClick = () => {
    Promise.resolve()
      .then(() =>
        _.shuffle(_.range(dices.length)).reduce(
          (promise, i) =>
            promise.then((values: DiceProps[]) => roll(values, i)),
          Promise.resolve().then(reset)
        )
      )
      .then((values) => {
        const hands = buildHand(values);
        hands
          .reduce(
            (promise, hand) =>
              promise.then((hands: Hand[]) => notify(hands, hand)),
            Promise.resolve().then(() => hands)
          )
          .then(() => {
            setDisabled(false);
            setCount(count + 1);
          });
      });
  };

  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
        bgcolor: "background.paper",
        borderRadius: 1,
        border: "1px solid #1C78D3",
      }}
    >
      <Stack
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            fontSize: "200%",
            fontWeight: "200",
            textAlign: "center",
          }}
        >
          OHAMACHI DICE
        </Box>
        <Grid container justifyContent="center" alignItems="center">
          {dices.map((dice, i) => (
            <Grid item key={i} xs={4}>
              <Dice {...dice} />
            </Grid>
          ))}
        </Grid>
        <Box>
          <Button
            variant="outlined"
            size="large"
            onClick={handleOnClick}
            disabled={disabled}
          >
            おはまちこする
          </Button>
        </Box>
        {/* <Box>{count}</Box> */}
      </Stack>
    </Box>
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
