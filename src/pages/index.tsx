import { Container, Box, Grid, Button, Stack } from "@mui/material";
import * as _ from "lodash";
import type { NextPage } from "next";
import * as React from "react";
import { CSSProperties, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import FaceOImg from "../../public/o.svg";
import FaceHaImg from "../../public/ha.svg";
import FaceMaImg from "../../public/ma.svg";
import FaceChiImg from "../../public/chi.svg";
import FaceKoImg from "../../public/ko.svg";
import EmptyImg from "../../public/empty.svg";

const Face = {
  O: "o",
  Ha: "ha",
  Ma: "ma",
  Chi: "chi",
  Ko: "ko",
  Empty: "empty",
} as const;
type Face = typeof Face[keyof typeof Face];

const FaceImage = ({ face, style }: { face?: Face; style?: CSSProperties }) => {
  switch (face) {
    case Face.O:
      return <FaceOImg style={style} />;
    case Face.Ha:
      return <FaceHaImg style={style} />;
    case Face.Ma:
      return <FaceMaImg style={style} />;
    case Face.Chi:
      return <FaceChiImg style={style} />;
    case Face.Ko:
      return <FaceKoImg style={style} />;
    default:
      return <EmptyImg style={style} />;
  }
};

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

    const much = HandList.find((hand) => {
      // Not match but much !!!
      const much = hand.units.reduce((much, unit: [Face, number]) => {
        const [face, num] = unit;
        return much && countFace(cnt, face) >= num;
      }, true);

      return much;
    });

    return much;
  };

  const handleOnClick = () => {
    Promise.resolve()
      .then(reset)
      .then(() =>
        _.shuffle(_.range(dices.length))
          .reduce(
            (promise, i) =>
              promise.then((values: DiceProps[]) => roll(values, i)),
            Promise.resolve().then(reset)
          )
      )
      .then((values) => {
        const hand = buildHand(values);

        if (hand) {
          toast.success(hand.name, {
            icon: hand.icon,
            duration: 5000,
            style: {
              fontSize: "250%",
              fontWeight: "200",
            },
          });
        }

        setDisabled(false);
        setCount(count + 1);
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
