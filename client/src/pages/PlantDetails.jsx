import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { QUERY_PLANT, QUERY_USER } from "../utils/queries";
import { useEffect, useState } from "react";
import { Button, IconButton, TextField } from "@mui/material";
import { DELETE_PLANT } from "../utils/mutations";
import useAuthService from "../utils/authHook";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import "./plantDetails.css";

export default function PlantDetails() {
  const navigate = useNavigate("/mygarden");
  const { plantId } = useParams();
  const [singlePlantData, setSinglePlantData] = useState(null);
  const Auth = useAuthService();
  const token = Auth.getToken();
  const user = Auth.getProfile(token);
  useQuery(QUERY_USER, {
    variables: { userId: user.data._id },
  });

  const [getPlantData, { error, data }] = useLazyQuery(QUERY_PLANT);
  const [deletePlantById] = useMutation(DELETE_PLANT, {
    onQueryUpdated: (updated) => {},
    onCompleted: () => {
      navigate("/mygarden");
    },
  });

  /* FOR KATE: Performance - Remove before deployment and conditionally render based on useQuery hook*/
  useEffect(() => {
    getPlantData({ variables: { plantId: plantId } });
    if (data) {
      setSinglePlantData(data);
    }
  }, [data, getPlantData, plantId]);
  if (error) {
    console.warn(error);
  }
  async function deletePlant() {
    deletePlantById({ variables: { id: plantId } });
  }
  return (
    <div style={{ width: "100%" }}>
      <div
        className="plant-details-column"
        style={{
          marginLeft: "20px",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ padding: "20px" }}>
          <h1>{singlePlantData?.plant?.latinName}</h1>
          <a
            href={singlePlantData?.plant?.img}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={singlePlantData?.plant?.img}
              alt="Plant"
              style={{ borderRadius: "10px" }}
            />
          </a>
        </div>
        <div>
          <div style={{ padding: "40px" }}>
            <h2>Common Name:</h2>
            <p style={{ fontSize: "22px" }}>
              {singlePlantData?.plant?.commonName}
            </p>
            <h2>Ideal Light:</h2>
            <p style={{ fontSize: "22px" }}>
              {singlePlantData?.plant?.idealLight}
            </p>
            <h2>Watering:</h2>
            <p style={{ fontSize: "22px" }}>
              {singlePlantData?.plant?.watering}
            </p>
            <Button variant="contained" color="success" onClick={deletePlant}>
              DELETE PLANT
            </Button>
          </div>
        </div>
      </div>
      <div
        style={{
          margin: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            margin: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {" "}
          <TextField
            id="outlined-multiline-flexible"
            label="Add a note"
            multiline
            rows={4}
            defaultValue=""
            style={{
              width: "100%",
              backgroundColor: "#9ad7b5",
              marginBottom: "10px",
              alignSelf: "center",
            }}
          />
          <Button
            variant="contained"
            color="success"
            style={{ width: "200px", alignSelf: "center" }}
            onClick={deletePlant}
          >
            ADD NOTE
          </Button>
        </div>
        <div
          style={{
            margin: "20px",
            backgroundColor: "#cae6d5",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>Plant notes will populate here with buttons to edit/delete</div>
          <div>
            <IconButton aria-label="add" size="large" color="success">
              <NoteAddIcon fontSize="inherit" />
            </IconButton>
            <IconButton aria-label="delete" size="large" color="error">
              <DeleteForeverIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}
