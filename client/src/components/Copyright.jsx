<<<<<<< HEAD
import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export function Copyright(props) {
=======
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Copyright(props) {
>>>>>>> 71104f45ab875e36bd06f6b2554a575843e10473
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Plantastic
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
