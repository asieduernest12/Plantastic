import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Stack,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";

import Auth from "../utils/authHook";
import { useMutation } from "@apollo/client";
import { NavLink } from "react-router-dom";
import Copyright from "../components/Copyright";
import useAuthService from "../utils/authHook";
import { UPDATE_USER } from "../utils/mutations";
import { useNavigate } from "react-router-dom";
import { DELETE_USER } from "../utils/mutations";






export default function AccountInfo() {
const [userFormData, setUserFormData] = useState({ email: "", username: "" });
const [validated] = useState(false);
const [showAlert, setShowAlert] = useState(false);
const [updateUser, { error }] = useMutation(UPDATE_USER);
const [deleteUser, { err }] = useMutation(DELETE_USER);
const Auth = useAuthService();
const navigate = useNavigate();


const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({
        ...userFormData,
        [name]: value,
    });
};
    
const handleFormSubmit = async (event ) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    try {
        const response = await updateUser({
            variables: { ...userFormData, id: Auth.getProfile().data._id },
        });
        const { token } = response.data.updateUser;
       
    } catch (err) {
        setShowAlert(true);
    }
    setUserFormData({
        email: "",
        username: "",
    });
};

return (
    <Stack
      direction="row"
      sx={{ height: "100%", width: "100%", placeContent: "center" }}
    >
      <Stack
        component="form"
        className="login-form"
        onSubmit={handleFormSubmit}
        sx={{ width: "100%", direction: "column", placeContent: "center" }}
      >
        <Stack
          direction="column"
          justifyContent={"center"}
          sx={{
            width: "clamp(300px,80%,400px)",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            margin: "auto",
          }}
        >
          {error && (
          <FormHelperText error={error}>
                      Username or email already exists. Please try again.
                    </FormHelperText>)}
          {/* change Logo*/}
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {/* <LockIcon sx={{ alignSelf: "center" }} /> */}
          </Avatar>

          <Typography component="h1" variant="h5">
            Update Profile
          </Typography>

          <FormControl sx={{ width: "100%" }}>
            <TextField
              label="New Username"
              type="text"
              className="form-control"
              id="username"
              name="username"
              onChange={handleInputChange}
              value={userFormData.username}
              required
              //onBlur={handleEmailBlur}
            />
            
          
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <TextField
              label="New Email"
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={userFormData.email}
              onChange={handleInputChange}
              required
              //   onBlur={handlePasswordBlur}
            />
          
            
          </FormControl>

          <Button type="submit" variant="contained" sx={{ width: "100%" }}>
            Update Profile
          </Button>
          <Button type="submit" variant="contained" sx={{ width: "100%" }} onClick={async (event) => {
        event.preventDefault();
        try {
          const response = await deleteUser({
            variables: { id: Auth.getProfile().data._id },
          });
          const { token } = response.data.deleteUser;
          Auth.login(token);
          setUserFormData({
            email: "",
            username: "",
          });
          // Redirect to the homepage after deleting the user
          navigate('/');
        } catch (err) {
          setShowAlert(true);
        }
      }}
    >
      Delete Profile
    </Button>
          

          <Copyright sx={{ mt: 3 }} />
        </Stack>
      </Stack>
    </Stack>
  );
}