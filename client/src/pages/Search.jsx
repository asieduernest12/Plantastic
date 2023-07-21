// make a mui search component that is a
import React, { useState } from "react";
import { Box, Button, FormControl, Stack, TextField } from "@mui/material";
import SearchResultDetail from "../components/SearchResultDetail";

export default function Search() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  // make acolumn with a input text field on top,
  // a button below it and a list 3 random plant names
  async function handleApi() {
    setLoading(true);
    const url = `https://house-plants2.p.rapidapi.com/search?query=${search}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "8316de9550msh6c76faa12e41f88p1ab3e3jsn6c4263cb35dc",
        "X-RapidAPI-Host": "house-plants2.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
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
      >
        <FormControl sx={{ width: "100%" }} className="d-outline">
          {loading && (
            <div>
              <i class="fa-solid fa-seedling fa-bounce"></i>Loading...
            </div>
          )}
          {!loading && (
            <>
              <TextField
                className="searchTextField"
                placeholder="Search Plants"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <Button variant="contained" color="primary" onClick={handleApi}>
                Click to search
              </Button>
            </>
          )}
        </FormControl>

        {/* show results */}

        <Stack direction={"column"} gap={3} py={3}>
          {data &&
            data.map((result) => (
              <SearchResultDetail
                imgLink={result?.item?.Img}
                title={result?.item?.["Latin name"]}
                data={result}
              />
            ))}
        </Stack>
      </Box>
    </Stack>
  );
}
