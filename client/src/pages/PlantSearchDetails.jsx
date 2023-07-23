import { Delete } from "@mui/icons-material";
import { Box, Button, FormControl, IconButton, Stack, TextareaAutosize, Typography } from "@mui/material";
import React, { useState } from "react";
import { ResponsiveImageContainer } from "../components/ResponsiveImageContainer";

/**
 *
 * @param {*} props
 * @returns
 */
function PlantSearchDetails(/** @type {{plant:HousePlant.PlantData}}*/ { plant }) {
  const [notes, setNotes] = useState(undefined);

  const handleAddNote = (e) => {
    e.preventDefault();
    setNotes([...(notes ?? []), e.target.elements.note.value]);
  };

  return (
    <Stack gap={3}>
      <Box sx={{ height: "300px" }}>
        <ResponsiveImageContainer image={plant.item.Img} />
      </Box>
      <Typography variant="h1" component="h5">
        {plant.item["Latin name"] ?? "No name"}
      </Typography>

      {/* text information */}

      <Box component="form" onSubmit={handleAddNote}>
        <FormControl>
          <TextareaAutosize placeholder="Add personal note" name="note"></TextareaAutosize>
        </FormControl>
        <Button variant="contained" type="submit">
          Add Note
        </Button>
      </Box>

      {/* list of personal notes, will be store if save button is clicked */}
      <Stack direction="column">
        {notes?.map((note) => (
          <Stack key={note} direction="row">
            <Typography sx={{ display: "grid", placeItems: "center" }}>{note}</Typography>
            <IconButton>
              <Delete />
            </IconButton>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

export default PlantSearchDetails;
