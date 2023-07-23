import {
  Box,
  Button,
  IconButton,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React from "react";
import { ResponsiveImageContainer } from "../components/ResponsiveImageContainer";
import { Delete } from "@mui/icons-material";

/**
 *
 * @param {*} props
 * @returns
 */
function PlantSearchDetails({ plant }) {
  return (
    <Stack>
      <Typography variant="h1">{plant.name}</Typography>
      <Box sx={{ height: "300px" }}>
        <ResponsiveImageContainer image={plant.image} />
      </Box>

      {/* text information */}
      <TextareaAutosize placeholder="Add personal note"></TextareaAutosize>

      <Button variant="contained">Add Note</Button>

      {/* list of personal notes, will be store if save button is clicked */}
      <Stack direction="column">
        {plant.notes.map((note) => (
          <Box key={note._id}>
            <Typography>{note.text}</Typography>
            <IconButton>
              <Delete />
            </IconButton>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}

export default PlantSearchDetails;
