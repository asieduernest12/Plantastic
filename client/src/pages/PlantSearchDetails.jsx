import { useLazyQuery } from "@apollo/client";
import { Delete } from "@mui/icons-material";
import { Box, Button, CircularProgress, FormControl, IconButton, Paper, Stack, TextareaAutosize, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ResponsiveImageContainer } from "../components/ResponsiveImageContainer";
import { QUERY_PLANT } from "../utils/queries";

/**
 *
 * @param {*} props
 * @returns
 */
function PlantSearchDetails() {
  const params = useParams();
  const [query, { error, loading }] = useLazyQuery(QUERY_PLANT);
  const [plant, setPlant] = useState(undefined);

  const [notes, setNotes] = useState(undefined);

  const handleAddNote = (e) => {
    e.preventDefault();
    setNotes([...(notes ?? []), e.target.elements.note.value]);
  };

  useEffect(() => {
    if (!params.id) {
      return;
    }

    query({ variables: { id: params.id } }).then((res) => setPlant(res.data.plant));
  }, [params, query]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    alert("Error loading plant details: " + error.message);
  }

  console.log({ plant });
  if (!plant?.commonName) {
    return <Typography variant="h1">No plant selected</Typography>;
  }

  return (
    <Stack direction="row" sx={{ placeContent: "center", padding: 5 }}>
      <Paper elevation={5} component={Stack} gap={3} sx={{ width: "clamp(300px,60%,800px)", borderRadius: "5px", overflow: "hidden" }}>
        <Box sx={{ height: "300px" }}>
          <ResponsiveImageContainer image={plant.img} />
        </Box>

        <Typography variant="h1" component="h5">
          {plant.commonName ?? "No name"}
        </Typography>

        {/* text information */}

        <Box component="form" onSubmit={handleAddNote} p={2} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
      </Paper>
    </Stack>
  );
}

export default PlantSearchDetails;
