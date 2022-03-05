import { Container, Box, Grid, Button, Stack } from "@mui/material";
import type { NextPage } from "next";
import * as React from "react";
import { CSSProperties, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import FaceOImg from "../public/o.svg";
import FaceHaImg from "../public/ha.svg";
import FaceMaImg from "../public/ma.svg";
import FaceChiImg from "../public/chi.svg";
import FaceKoImg from "../public/ko.svg";
import EmptyImg from "../public/empty.svg";

const random = (size: number) => Math.floor(Math.random() * size);

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

  const [dice0, setDice0] = useState<DiceProps>(defaultDices[0]);
  const [dice1, setDice1] = useState<DiceProps>(defaultDices[1]);
  const [dice2, setDice2] = useState<DiceProps>(defaultDices[2]);
  const [dice3, setDice3] = useState<DiceProps>(defaultDices[3]);
  const [dice4, setDice4] = useState<DiceProps>(defaultDices[4]);
  const [count, setCount] = useState(0);
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

  const countFace = (map: Map<Face, number>, face: Face) => map.get(face) || 0;

  const buildHand = (faces: Face[]) => {
    const cnt = faces.reduce((map, face: Face) => {
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
    reset();
    setDisabled(true);

    Promise.all([
      roll(dice0, setDice0, 350 * 1),
      roll(dice1, setDice1, 350 * 2),
      roll(dice2, setDice2, 350 * 3),
      roll(dice3, setDice3, 350 * 4),
      roll(dice4, setDice4, 350 * 5),
    ]).then((values) => {
      const hand = buildHand(
        values.filter<Face>((face): face is Face => face !== undefined)
      );

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
          <Grid item xs={4}>
            <Dice {...dice0} />
          </Grid>
          <Grid item xs={4}>
            <Dice {...dice2} />
          </Grid>
          <Grid item xs={4}>
            <Dice {...dice4} />
          </Grid>
          <Grid item xs={4}>
            <Dice {...dice1} />
          </Grid>
          <Grid item xs={4}>
            <Dice {...dice3} />
          </Grid>
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
