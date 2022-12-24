import { Container } from "@mui/material";
import * as _ from "lodash";
import type { NextPage } from "next";
import * as React from "react";
import { Toaster } from "react-hot-toast";
import { PlayFiled } from "../components/organisms/playField";

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
        <PlayFiled />
      </Container>
    </React.Fragment>
  );
};

export default Home;
