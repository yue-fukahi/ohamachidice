import { Box } from "@mui/material";

import { Face } from "../constants/face";
import { FaceImage } from "./faceImage";

interface DiceProps {
  faces: Face[];
  selected?: Face;
}

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

export { type DiceProps, Dice };
