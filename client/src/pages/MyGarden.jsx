import React, { useState } from "react";
import useAuthService from "../utils/authHook";
import { Box, Grid, Popover, Stack, Typography } from "@mui/material";
import { ResponsiveImageContainer } from "../components/ResponsiveImageContainer";
import PlantSearchDetails from "./PlantSearchDetails";

const fakePlants = Array(5)
  .fill(null)
  .map(() => ({
    name: "plant",
    _id: crypto.getRandomValues(new Uint32Array(1))[0],
    image: "https://via.placeholder.com/150/flower",
  }));

/**
 *
 * @param {*} props
 * @returns
 */
function MyGarden(props) {
  const auth = useAuthService();
  const [firstPlant, ...restOfPlants] = fakePlants;
  const [openDetails, setOpenDetails] = useState(false);
  const [detailIndex, setDetailIndex] = useState(undefined);

  const closeDetails = () => {
    setOpenDetails(false);
  };

  const openDetailsAtIndex = (index) => {
    setDetailIndex(index);
    setOpenDetails(true);
  };

  return (
    <Stack className="MyGarden" sx={{ direction: "row", placeItems: "center" }}>
      <Stack sx={{ p: 5, width: "clamp(300px,60%,700px)" }}>
        <Box className="myGardenHeader">
          <p>Hello</p>
          <Typography variant="h1">{auth.user.username}</Typography>
        </Box>

        {/* plants list in a 2/2 grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "200px",
            gap: 2,
          }}
        >
          {/* first plant takes 2 columns and 2 rows*/}
          <Box sx={{ gridColumn: "1 / 3", gridRow: "1 / 3" }} onClick={() => openDetailsAtIndex(1)}>
            <ResponsiveImageContainer image={firstPlant.image} />
          </Box>

          {/* rest of the plants take 1 column and 1 row */}
          {restOfPlants.map((plant) => (
            <Box key={plant._id} onClick={() => openDetailsAtIndex(1)}>
              <ResponsiveImageContainer key={plant._id} image={plant.image} />
            </Box>
          ))}
        </Box>

        <Popover open={openDetails} onClose={closeDetails}>
          <Stack direction="row" sx={{ placeItems: "center" }}>
            <Box width={"clamp(300,60%,800px)"}>{firstPlant ? <PlantSearchDetails plant={firstPlant} /> : <></>}</Box>
          </Stack>
        </Popover>
      </Stack>
    </Stack>
  );
}

export default MyGarden;
