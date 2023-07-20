// make a mui dashboard component that is a
import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const fakeResults = [
  {
    title: "Aloe Vera",
    image:
      "https://t4.ftcdn.net/jpg/05/70/26/97/360_F_570269737_Zb7wlzg77ZxGXbe1BfQVy0fK9lmXXEQe.jpg",
    link: "https://www.almanac.com/plant/aloe-vera",
  },
  {
    title: "Aloe Vera",
    image:
      "https://t4.ftcdn.net/jpg/05/70/26/97/360_F_570269737_Zb7wlzg77ZxGXbe1BfQVy0fK9lmXXEQe.jpg",
    link: "https://www.almanac.com/plant/aloe-vera",
  },
  {
    title: "Aloe Vera",
    image:
      "https://t4.ftcdn.net/jpg/05/70/26/97/360_F_570269737_Zb7wlzg77ZxGXbe1BfQVy0fK9lmXXEQe.jpg",
    link: "https://www.almanac.com/plant/aloe-vera",
  },
  {
    title: "Aloe Vera",
    image:
      "https://www.almanac.com/sites/default/files/styles/primary_image_in_article/public/image_nodes/aloe-vera-houseplant.jpg?itok=Q4QJQ6Zq",
    link: "https://www.almanac.com/plant/aloe-vera",
  },
  {
    title: "Aloe Vera",
    image:
      "https://www.almanac.com/sites/default/files/styles/primary_image_in_article/public/image_nodes/aloe-vera-houseplant.jpg?itok=Q4QJQ6Zq",
    link: "https://www.almanac.com/plant/aloe-vera",
  },
  {
    title: "Aloe Vera",
    image:
      "https://t4.ftcdn.net/jpg/05/70/26/97/360_F_570269737_Zb7wlzg77ZxGXbe1BfQVy0fK9lmXXEQe.jpg",
    link: "https://www.almanac.com/plant/aloe-vera",
  },
  {
    title: "Aloe Vera",
    image:
      "https://t4.ftcdn.net/jpg/05/70/26/97/360_F_570269737_Zb7wlzg77ZxGXbe1BfQVy0fK9lmXXEQe.jpg",
    link: "https://www.almanac.com/plant/aloe-vera",
  },
];

export default function Dashboard() {
  // make acolumn with a input text field on top,
  // a button below it and a list 3 random plant names

  return (
    <Stack
      className="Dashboard"
      direction="row"
      sx={{
        justifyContent: "center",
        padding: 4,
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        component="form"
        className="searchForm"
        sx={{
          width: "clamp(300px,60%,600px)",
          height: "clamp(300px,60%,600px)",
        }}
      >
        <FormControl sx={{ width: "100%" }} className="d-outline">
          <FormLabel>Search plant</FormLabel>
          <TextField clasName="searchTextField"></TextField>
        </FormControl>

        {/* show results */}

        <Stack direction={"column"} gap={3} py={3}>
          {fakeResults.map((result) => (
            <SearchResultDetail {...result} />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}

function SearchResultDetail({ title, image, link }) {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: "1rem" }}>
      <Box className="plantImage">
        <img
          src={image}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      </Box>

      <Stack>
        <Typography variant="h2">{title}</Typography>
        <Button variant="contained" color="primary" href={link}>
          Add Plant
        </Button>
      </Stack>
    </Box>
  );
}
