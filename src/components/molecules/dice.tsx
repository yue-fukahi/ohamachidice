import { Box } from "@mui/material";

import { Face } from "../../constants/face";
import { FaceImage } from "../atoms/faceImage";

interface DiceProps {
  faces: Face[];
  selected?: Face;
  size?: string;
}

const Dice = (props: DiceProps) => {
  const size = props.size ?? "160px";

  const imgStyle = {
    width: size,
    height: size,
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
