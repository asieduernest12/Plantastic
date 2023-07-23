// make a mui search component that is a
import { SearchRounded } from "@mui/icons-material";
import { Box, Button, FormControl, Modal, Popover, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import SearchResultItem from "../components/SearchResultItem";
import PlantSearchDetails from "./PlantSearchDetails";

export default function Search() {
  const [search, setSearch] = useState("");
  const [plantsFound, setPlantsFound] = useState(/** @type {HousePlant.PlantData[]|undefined}*/ (null));
  const [loading, setLoading] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [detailIndex, setDetailIndex] = useState(undefined);

  async function handleApi(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/fetchplant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchTerm: search }),
      });
      const plantData = await response.json();
      console.log({ plantData });
      setPlantsFound(plantData.data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }

  const closeDetails = () => {
    setOpenDetails(false);
  };

  const openDetailsAtIndex = (index) => {
    setDetailIndex(index);
    setOpenDetails(true);
  };

  return (
    <Stack
      className="Search"
      direction="row"
      sx={{
        justifyContent: "center",
        padding: 4,
        height: "95%",
        width: "100%",
        overflowY: "scroll",
      }}
    >
      <Box
        component="form"
        className="searchForm"
        sx={{
          width: "clamp(300px,60%,600px)",
          height: "clamp(300px,60%,600px)",
        }}
        onSubmit={handleApi}
      >
        <FormControl sx={{ width: "100%" }} className="">
          {loading && (
            <div>
              <i className="fa-solid fa-seedling fa-bounce"></i>Loading...
            </div>
          )}
          {!loading && (
            <Stack direction="column" gap={2}>
              <TextField
                className="searchTextField"
                placeholder="Search Plants"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                required
              />
              <Button variant="contained" color="primary" type="submit">
                Click to search
              </Button>
            </Stack>
          )}
        </FormControl>

        {/* show results */}

        <Stack direction={"column"} gap={3} py={3}>
          {plantsFound && (
            <>
              <Typography variant="h2">Plants found: {plantsFound.length}</Typography>
              {plantsFound.map((result, index) => (
                <SearchResultItem
                  key={result?.item?.id}
                  imgLink={result?.item?.Img}
                  title={result?.item?.["Latin name"]}
                  data={result?.item}
                  onClick={() => openDetailsAtIndex(index)}
                />
              ))}
            </>
          )}
        </Stack>

        {/* prompt user to make a search */}
        {!plantsFound ? (
          <Stack direction="row">
            <SearchRounded />
            <Typography variant="h3">No searches yet</Typography>
          </Stack>
        ) : (
          <></>
        )}
      </Box>

      <Popover open={openDetails} onClose={closeDetails}>
        <Stack direction="row" sx={{ placeItems: "center" }}>
          <Box width={"clamp(300,60%,800px)"}>
            {detailIndex && plantsFound[detailIndex] ? <PlantSearchDetails plant={plantsFound[detailIndex]} /> : <></>}
          </Box>
        </Stack>
      </Popover>
    </Stack>
  );
}
