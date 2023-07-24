import { Box, CircularProgress } from "@mui/material";
import React from "react";

function CenteredCircularProgress(props) {
  return (
    <Box sx={{ display: "grid", placeContent: "center", height: "100%", width: "100%" }}>
      <CircularProgress />
    </Box>
  );
}

export default CenteredCircularProgress;
