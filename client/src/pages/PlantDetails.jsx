import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { QUERY_PLANT, QUERY_USER } from "../utils/queries";
import { useEffect, useState } from "react";
import { Button, IconButton, TextField } from "@mui/material";
import { DELETE_PLANT } from "../utils/mutations";
import useAuthService from "../utils/authHook";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

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
    <div
      style={{
        marginLeft: "20px",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <div style={{ padding: "20px" }}>
        <h1>{singlePlantData?.plant?.latinName}</h1>
        <a
          href={singlePlantData?.plant?.img}
          target="_blank"
          rel="noopener noreferrer"
        >
         <img src={singlePlantData?.plant?.img} alt="Plant" style={{ borderRadius: "10px" }} />
        </a>
      </div>
      <div>
        <div style={{ padding: "40px" }}>
          <h2>Common Name:</h2>
          <p>{singlePlantData?.plant?.commonName}</p>
          <h2>Ideal Light:</h2>
          <p>{singlePlantData?.plant?.idealLight}</p>
          <h2>Watering:</h2>
          <p>{singlePlantData?.plant?.watering}</p>
         <p> <TextField 
          id="outlined-multiline-flexible"
          label="Add a note"
          multiline
          rows={4}
          defaultValue=""
        />
        <IconButton aria-label="add" size="large" color="success">
         <NoteAddIcon fontSize="inherit" />
        </IconButton>
          <IconButton aria-label="delete" size="large" color="error">
         <DeleteForeverIcon fontSize="inherit" />
        </IconButton>
        </p>
         
          <Button variant="contained" color="success" onClick={deletePlant}>
            DELETE PLANT
          </Button>
        </div>
      </div>
    </div>
  );
}

