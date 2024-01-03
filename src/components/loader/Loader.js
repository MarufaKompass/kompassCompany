import React from "react";

import { useLottie } from "lottie-react";
import animation from "../../assets/images/images/loader_animation.json";
import { Box } from "@mui/material/index";
export default function Loader() {
  const options = {
    animationData: animation,
    loop: true,
  };
  const { View } = useLottie(options);

  return (
    
    <Box display="flex" justifyContent="center" alignItems="center">
      {View}
    </Box>
  );
}
