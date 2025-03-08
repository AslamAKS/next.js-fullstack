"use client";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Register() {
  const [saveUser, setsaveUser] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [users, setusers] = useState([]);

  const fetchUsers = async () => {
    axios
      .get("api/saveuser")
      .then((responce) => {
        setusers(responce.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsaveUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      axios
        .post("/api/saveuser", saveUser)
        .then((responce) => {
          alert(`saved`);
          setsaveUser({ name: "", email: "", message: "" });
          fetchUsers();
        })
        .then((err) => {
          console.log(err);
          fetchUsers();
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete=(id)=>{
    console.log("id",id)
    try {
      axios
        .delete(`/api/saveuser?id=${id}`)
        .then((responce) => {
          alert(`deleted`);
          fetchUsers();
        })
        .then((err) => {
          console.log(err);
          fetchUsers();
        });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap:2
      }}
    >
      <Box
        sx={{
          width: "600px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          justifyContent: "center",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          name="name"
          value={saveUser.name}
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          name="email"
          value={saveUser.email}
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic"
          label="Message"
          variant="outlined"
          name="message"
          value={saveUser.message}
          onChange={handleChange}
        />
        <Button onClick={handleSubmit} color="success">
          Save
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell component="th" align="center">Name</TableCell>
              <TableCell component="th" align="center">Email</TableCell>
              <TableCell component="th" align="center">Message</TableCell>
              <TableCell component="th" align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell scope="row" align="center">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.message}</TableCell>
                <TableCell align="center" onClick={()=>handleDelete(row._id)} sx={{cursor:"pointer",color:"red"}}>Delete</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Register;
