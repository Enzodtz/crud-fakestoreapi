import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import UserForm from "features/user/components/UserForm";
import {
  deleteUser,
  selectFulfilled,
  selectPending,
  selectUsers,
  updateUser,
} from "features/user/userSlice";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { User } from "types/user";

function DeleteUser() {
  let { id } = useParams();
  const users = useAppSelector(selectUsers);
  const user = users.filter((user) => user.id.toString() === id)[0];
  const fulfilled = useAppSelector(selectFulfilled);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const pending = useAppSelector(selectPending);

  useEffect(() => {
    if (fulfilled) {
      alert("Usuário deletado com sucesso!");
      navigate("/");
    }
  }, [fulfilled]);

  const onClick = () => {
    dispatch(deleteUser(user));
  };

  return (
    <Box py={6}>
      <Container>
        <Typography variant="h3" component="span">
          Deletar Usuário
        </Typography>
        <p>
          Tem certeza que deseja deletar o usuário{" "}
          {user && user.name.firstname + " " + user.name.lastname}?
        </p>
        <Button variant="contained" color="error" onClick={onClick}>
          {pending ? <CircularProgress /> : "Deletar"}
        </Button>
      </Container>
    </Box>
  );
}

export default DeleteUser;
