import { Box, Button, Stack, Typography } from "@mui/material";

export default function SearchResultDetail({ imgLink, title, data }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "2fr 3fr",
        gap: "1rem",
      }}
    >
      <Box className="plantImage">
        <img
          src={imgLink}
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
        <Button variant="contained" color="primary" onClick={() => {}}>
          Add Plant
        </Button>
      </Stack>
    </Box>
  );
}
