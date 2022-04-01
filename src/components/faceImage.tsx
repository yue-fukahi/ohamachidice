import { CSSProperties } from "react";
import { Face } from "../constants/face";

import FaceOImg from "../../public/o.svg";
import FaceHaImg from "../../public/ha.svg";
import FaceMaImg from "../../public/ma.svg";
import FaceChiImg from "../../public/chi.svg";
import FaceKoImg from "../../public/ko.svg";
import EmptyImg from "../../public/empty.svg";

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

export { FaceImage };
