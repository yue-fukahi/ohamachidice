import { Badge, Box } from "@mui/material";

import { Face } from "../../constants/face";
import { FaceImage } from "../atoms/faceImage";

interface DiceProps {
  faces: Face[];
  selected?: Face;
  life: number;
  icon?: string;
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
      <Badge
        badgeContent={`${props.icon}${props.life}`}
        color="primary"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <FaceImage face={props.selected} style={imgStyle} />
      </Badge>
    </Box>
  );
};

export { type DiceProps, Dice };
