import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { QUERY_PLANT, QUERY_USER } from "../utils/queries";
import { useState } from "react";
import { Button, IconButton, TextField, Switch } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  DELETE_PLANT,
  ADD_PLANT_NOTE,
  DELETE_PLANT_NOTE,
} from "../utils/mutations";
import useAuthService from "../utils/authHook";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import client from "../client";
import "./plantDetails.css";

export default function PlantDetails() {
  const navigate = useNavigate("");
  const { plantId } = useParams();
  const Auth = useAuthService();
  const token = Auth.getToken();
  const user = Auth.getProfile(token);
  useQuery(QUERY_USER, {
    variables: { userId: user.data._id },
  });

  const [notification, setNotification] = useState(false);
  const handleSwitchChange = () => {
    setNotification((prevNotification) => !prevNotification);
  };

  const { error, data } = useQuery(QUERY_PLANT, {
    variables: { plantId },
    fetchPolicy: "network-only",
  });
  const [deletePlantById] = useMutation(DELETE_PLANT, {
    onCompleted: () => {
      navigate("/mygarden");
    },
  });

  const [note, setNote] = useState("");

  const [addPlantNoteToPlant] = useMutation(ADD_PLANT_NOTE, {
    onCompleted: () => {
      setNote("");
      client.reFetchObservableQueries();
    },
  });
  const [deletePlantNote] = useMutation(DELETE_PLANT_NOTE, {
    onCompleted: () => {
      setNote("");
      client.reFetchObservableQueries();
    },
  });

  const handleAddNote = async () => {
    if (note.trim() === "") {
      // Add validation to prevent empty notes from being added
      return;
    }

    try {
      addPlantNoteToPlant({
        variables: {
          id: plantId,
          note: note,
          username: user?.data?.username,
        },
      });
    } catch (error) {
      // Handle error (optional)
      console.error("Error adding note:", error.message);
    }
  };

  if (error) {
    console.warn(error);
  }
  async function deletePlant() {
    deletePlantById({ variables: { id: plantId } });
  }

  async function handleDeleteNote(noteId) {
    deletePlantNote({ variables: { plantId, noteId } });
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
        {/* Holds Name, Img, and Swithc */}
        <div
          style={{ padding: "20px", display: "flex", flexDirection: "column" }}
        >
          <h1>{data?.plant?.latinName}</h1>
          <a href={data?.plant?.img} target="_blank" rel="noopener noreferrer">
            <img
              src={data?.plant?.img}
              alt="Plant"
              style={{ borderRadius: "10px" }}
            />
          </a>
          <FormControlLabel
            control={
              <Switch
                checked={notification}
                onChange={handleSwitchChange}
                color="success"
              />
            }
            label="Email Care Reminder"
          />
        </div>
        {/* Holds Plant Details and Delete Button */}
        <div>
          <div style={{ padding: "40px" }}>
            <h2>Common Name:</h2>
            <p style={{ fontSize: "22px" }}>{data?.plant?.commonName}</p>
            <h2>Ideal Light:</h2>
            <p style={{ fontSize: "22px" }}>{data?.plant?.idealLight}</p>
            <h2>Watering:</h2>
            <p style={{ fontSize: "22px" }}>{data?.plant?.watering}</p>
            <Button variant="contained" color="success" onClick={deletePlant}>
              DELETE PLANT
            </Button>
          </div>
        </div>
      </div>
      {/* Holds Note Field, Button, and Notes Array */}
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
            onChange={(e) => setNote(e.target.value)}
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
            onClick={handleAddNote}
          >
            ADD NOTE
          </Button>
        </div>
        <div
          style={{
            margin: "20px",

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Display plant notes */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {data?.plant?.plantNotes.map((plantNote) => {
              console.log({ plantNote });
              return (
                <div
                  key={plantNote._id}
                  style={{
                    marginBottom: "10px",
                    backgroundColor: "#cae6d5",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div key={plantNote._id}>
                    <p style={{ paddingLeft: "20px" }}>{plantNote.note}</p>
                  </div>
                  <div>
                    <IconButton
                      key={plantNote.noteId}
                      aria-label="delete"
                      size="large"
                      color="success"
                    >
                      <DeleteForeverIcon
                        fontSize="inherit"
                        onClick={() => handleDeleteNote(plantNote.noteId)}
                      />
                    </IconButton>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
