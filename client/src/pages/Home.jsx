import { Box, Button, Stack } from "@mui/material";
import "./Home.css";
import React from "react";
import { NavLink } from "react-router-dom";
export default function Home() {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      {/* two columns */}
      <Box className="imageLogo" sx={{ height: "500px" }}>
        <img src={'./public/PlantasticLogo.png'} alt="Plantastic Logo" />
      </Box>
      <Box className="callToAction">
        <h2>some heading</h2>
        <caption>some caption goes here</caption>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore
          tempore dicta ex odio quasi quia! Unde repellat eius dignissimos,
          dolore optio impedit inventore officiis, dicta, debitis itaque enim!
          Quam, obcaecati.
        </p>
        <Button className="login" variant="contained" component={NavLink} to="/Login" color="success">Login</Button>
        <Button className="signUp" variant="contained" component={NavLink} to="/signup" color="success">Sign Up</Button>

      </Box>
    </Box>
  );
} //We updated a lot of the UI 